import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  Award,
  CircleDashed,
  LucideAngularModule,
  NotebookText,
  SignalHigh,
  Target,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { Conquista } from 'src/app/models/conquista.model';
import { AcademicoService } from 'src/app/services/academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConquistasService } from 'src/app/services/conquistas.service';
import { IonLabel } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { BloqueadoComponent } from '../bloqueado/bloqueado.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.scss'],
  standalone: true,
  imports: [IonLabel, CommonModule, LucideAngularModule, BloqueadoComponent],
})
export class ConquistasComponent implements OnInit {
  constructor(
    private academicoService: AcademicoService,
    private conquistasService: ConquistasService,
    private authService: AuthService,
    private stateService: StateService
  ) {}

  @Input() username: string = '';

  private modalidadeUpdateSubscription!: Subscription;
  academico: Academico | null = null;
  conquistas: Conquista[] = [];
  user: Academico | null = null;

  isBlocked: boolean = false;
  mensagemBloqueio: string =
    'O acadêmico bloqueou a visualização das conquistas.';

  modalidades: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Vôlei',
    3: 'Basquete',
    4: 'Tênis de Mesa',
    5: 'Handebol',
  };

  readonly Award = Award;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly CircleDashed = CircleDashed;
  readonly SignalHigh = SignalHigh;

  ngOnInit() {
    this.user = this.authService.getUser();
    const usernameFinal =
      this.username || this.authService.getUser()?.username || '';

    if (usernameFinal) {
      this.buscarAcademicoPorUsername(usernameFinal);

      this.modalidadeUpdateSubscription =
        this.stateService.updateModalidades$.subscribe(() => {
          if (this.academico) {
            this.buscarConquistasPorIdAcademico(this.academico.idAcademico);
          }
        });

      this.stateService.updateMetasEsportivas$.subscribe(() => {
        if (this.academico) {
          this.buscarConquistasPorIdAcademico(this.academico.idAcademico);
        }
      });
    } else {
      console.error('Username não fornecido');
    }
  }

  getModalidadeName(id: number): string {
    return this.modalidades[id] || 'Desconhecido';
  }

  buscarConquistasPorIdAcademico(idAcademico: number) {
    if (this.user && idAcademico === this.user.idAcademico) {
      this.conquistasService.getConquistasByUserId(idAcademico).subscribe({
        next: (conquistas: Conquista[] | null) => {
          this.conquistas = conquistas || [];
        },
        error: (err) => {
          if (err.status === 403) {
            this.isBlocked = true;
          } else {
            console.error('Erro ao buscar conquistas:', err);
          }
        },
      });
    } else {
      this.conquistasService
        .getConquistasByOutroAcademico(idAcademico)
        .subscribe({
          next: (conquistas: Conquista[] | null) => {
            this.conquistas = conquistas || [];
          },
          error: (err) => {
            if (err.status === 403) {
              this.isBlocked = true;
            } else {
              console.error(
                'Erro ao buscar conquistas de outro acadêmico:',
                err
              );
            }
          },
        });
    }
  }

  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico;

        if (this.academico) {
          this.buscarConquistasPorIdAcademico(this.academico.idAcademico);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      },
    });
  }
}
