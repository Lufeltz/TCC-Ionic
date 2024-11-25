import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';
import { EstatisticaUso } from 'src/app/models/estatistica-uso.model';
import { EstatisticasAcademicoService } from 'src/app/services/estatisticas-academico.service';
import { AuthService } from 'src/app/services/auth.service'; // Importe o AuthService
import { Academico } from 'src/app/models/academico.model'; // Importe o modelo Academico
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
import { StateModalidadesService } from 'src/app/services/state-modalidades.service';
import { Subscription } from 'rxjs';
import { BloqueadoComponent } from '../bloqueado/bloqueado.component';

@Component({
  selector: 'app-estatisticas-pessoais',
  templateUrl: './estatisticas-pessoais.component.html',
  styleUrls: ['./estatisticas-pessoais.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule, BloqueadoComponent],
})
export class EstatisticasPessoaisComponent implements OnInit {
  estatisticasUso: EstatisticaUso[] = [];
  estatisticasModalidadeUnica: EstatisticaModalidade[] = [];
  estatisticasModalidadeGeral: EstatisticaModalidadeGeral | null = null; // Alterado para ser um único objeto
  academico: Academico | null = null; // Variável para armazenar os dados do acadêmico logado

  @Input() username: string = '';
  private modalidadeUpdateSubscription!: Subscription;

  isBlocked: boolean = false; // Controla se o usuário está bloqueado
  mensagemBloqueio: string =
    'O acadêmico bloqueou a visualização das estatísticas.';
    
  user: Academico | null = null;

  // Lucide Icons
  readonly CircleDashed = CircleDashed;
  readonly Target = Target;
  readonly SignalHigh = SignalHigh;
  readonly Award = Award;
  readonly Medal = Medal;
  readonly Trophy = Trophy;
  readonly MapPinPlus = MapPinPlus;

  constructor(
    private estatisticaService: EstatisticasAcademicoService,
    private authService: AuthService,
    private academicoService: AcademicoService,
    private stateModalidadesService: StateModalidadesService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    // Verifica se o 'username' foi passado via @Input
    const usernameFinal =
      this.username || this.authService.getUser()?.username || ''; // Se não for passado, tenta pegar do AuthService

    // Se o usernameFinal não estiver vazio, tenta buscar o acadêmico
    if (usernameFinal) {
      this.buscarAcademicoPorUsername(usernameFinal);

      this.modalidadeUpdateSubscription =
        this.stateModalidadesService.updateModalidades$.subscribe(() => {
          if (this.academico) {
            this.loadEstatisticasUso(this.academico.idAcademico);
            this.loadEstatisticasMetasEsportivas(this.academico.idAcademico);
          }
        });
    } else {
      console.error('Username não fornecido');
    }
  }

  // Função para buscar o acadêmico pelo username
  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico; // Atribui o acadêmico à variável
        if (this.academico) {
          // Se o acadêmico for encontrado, carrega as estatísticas
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

  // Função para realizar a requisição e salvar os dados de uso
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

  // Função para realizar a requisição e salvar os dados de modalidade
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
              this.isBlocked = true; // Define como bloqueado
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
              this.isBlocked = true; // Define como bloqueado
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
