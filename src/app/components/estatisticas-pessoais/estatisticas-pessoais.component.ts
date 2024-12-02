import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';
import { EstatisticaUso } from 'src/app/models/estatistica-uso.model';
import { EstatisticasAcademicoService } from 'src/app/services/estatisticas-academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { EstatisticaModalidadeGeral } from 'src/app/models/estatistica-modalidade-geral.model';
import {
  Award,
  CircleDashed,
  LucideAngularModule,
  MapPinPlus,
  Medal,
  SignalHigh,
  Target,
  Trophy,
} from 'lucide-angular';
import { AcademicoService } from 'src/app/services/academico.service';
import { Subscription } from 'rxjs';
import { BloqueadoComponent } from '../bloqueado/bloqueado.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-estatisticas-pessoais',
  templateUrl: './estatisticas-pessoais.component.html',
  styleUrls: ['./estatisticas-pessoais.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BloqueadoComponent],
})
export class EstatisticasPessoaisComponent implements OnInit {
  constructor(
    private estatisticaService: EstatisticasAcademicoService,
    private authService: AuthService,
    private academicoService: AcademicoService,
    private stateService: StateService
  ) {}

  @Input() username: string = '';
  private modalidadeUpdateSubscription!: Subscription;

  estatisticasUso: EstatisticaUso[] = [];
  estatisticasModalidadeUnica: EstatisticaModalidade[] = [];
  estatisticasModalidadeGeral: EstatisticaModalidadeGeral | null = null;
  academico: Academico | null = null;

  isBlocked: boolean = false;
  mensagemBloqueio: string =
    'O acadêmico bloqueou a visualização das estatísticas.';

  user: Academico | null = null;

  readonly CircleDashed = CircleDashed;
  readonly Target = Target;
  readonly SignalHigh = SignalHigh;
  readonly Award = Award;
  readonly Medal = Medal;
  readonly Trophy = Trophy;
  readonly MapPinPlus = MapPinPlus;

  ngOnInit() {
    this.user = this.authService.getUser();

    const usernameFinal =
      this.username || this.authService.getUser()?.username || '';

    if (usernameFinal) {
      this.buscarAcademicoPorUsername(usernameFinal);

      this.modalidadeUpdateSubscription =
        this.stateService.updateModalidades$.subscribe(() => {
          if (this.academico) {
            this.loadEstatisticasUso(this.academico.idAcademico);
            this.loadEstatisticasMetasEsportivas(this.academico.idAcademico);
          }
        });

      this.stateService.updateMetasEsportivas$.subscribe(() => {
        if (this.academico) {
          this.loadEstatisticasUso(this.academico.idAcademico);
          this.loadEstatisticasMetasEsportivas(this.academico.idAcademico);
        }
      });
    } else {
      console.error('Username não fornecido');
    }
  }

  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico;
        if (this.academico) {
          this.loadEstatisticasUso(this.academico.idAcademico);
          this.loadEstatisticasMetasEsportivas(this.academico.idAcademico);
        } else {
          console.error('Acadêmico não encontrado!');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      },
    });
  }

  loadEstatisticasUso(id: number) {
    this.estatisticaService.getEstatisticasUso(id).subscribe({
      next: (data: EstatisticaUso[] | null) => {
        this.estatisticasUso = data || [];
      },
      error: (err) => {
        console.error('Erro ao buscar dados de estatísticas de uso:', err);
      },
    });
  }

  loadEstatisticasModalidade(idAcademico: number, idModalidade: number) {
    this.estatisticaService
      .getEstatisticasModalidade(idAcademico, idModalidade)
      .subscribe({
        next: (data: EstatisticaModalidade[] | null) => {
          const estatisticas = data || [];
          this.estatisticasModalidadeUnica.push(...estatisticas);
        },
        error: (err) => {
          console.error(
            `Erro ao buscar dados de estatísticas de modalidade para modalidade ${idModalidade}:`,
            err
          );
        },
      });
  }

  loadEstatisticasMetasEsportivas(idAcademico: number) {
    if (this.user && idAcademico === this.user.idAcademico) {
      this.estatisticaService
        .getEstatisticasMetasEsportivas(idAcademico)
        .subscribe({
          next: (data: EstatisticaModalidadeGeral | null) => {
            this.estatisticasModalidadeGeral = data;
          },
          error: (err) => {
            if (err.status === 403) {
              this.isBlocked = true;
            } else {
              console.error(
                'Erro ao buscar dados de todas as modalidades:',
                err
              );
            }
          },
        });
    } else {
      this.estatisticaService
        .getEstatisticasMetasEsportivasOutroAcademico(idAcademico)
        .subscribe({
          next: (data: EstatisticaModalidadeGeral | null) => {
            this.estatisticasModalidadeGeral = data;
          },
          error: (err) => {
            if (err.status === 403) {
              this.isBlocked = true;
            } else {
              console.error(
                'Erro ao buscar dados de todas as modalidades do outro acadêmico:',
                err
              );
            }
          },
        });
    }
  }
}
