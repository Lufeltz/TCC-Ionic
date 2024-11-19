import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  Award,
  CircleDashed,
  Ellipsis,
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
import { StateModalidadesService } from 'src/app/services/state-modalidades.service';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.scss'],
  standalone: true,
  imports: [IonLabel, CommonModule, LucideAngularModule],
})
export class ConquistasComponent implements OnInit {
  private modalidadeUpdateSubscription!: Subscription;

  modalidades: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Vôlei',
    3: 'Basquete',
    4: 'Tênis de Mesa',
    5: 'Handebol',
  };

  getModalidadeName(id: number): string {
    return this.modalidades[id] || 'Desconhecido';
  }

  readonly Award = Award;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly CircleDashed = CircleDashed;
  readonly SignalHigh = SignalHigh;

  academico: Academico | null = null;
  conquistas: Conquista[] = []; // Variável para armazenar as conquistas
  @Input() username: string = ''; // Recebe o username como @Input()

  constructor(
    private academicoService: AcademicoService,
    private conquistasService: ConquistasService,
    private authService: AuthService,
    private stateModalidadesService: StateModalidadesService
  ) {}

  ngOnInit() {
    // Verifica se o 'username' foi passado via @Input
    const usernameFinal =
      this.username || this.authService.getUser()?.username || ''; // Se não for passado, tenta pegar do AuthService
    console.log(usernameFinal);
    // Se o usernameFinal não estiver vazio, tenta buscar o acadêmico
    if (usernameFinal) {
      this.buscarAcademicoPorUsername(usernameFinal);

      this.modalidadeUpdateSubscription =
        this.stateModalidadesService.updateModalidades$.subscribe(() => {
          this.buscarConquistasPorIdAcademico(this.academico!.idAcademico);
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
        console.log(this.academico);

        // Após ter o 'academico', busca as conquistas
        if (this.academico) {
          this.buscarConquistasPorIdAcademico(this.academico.idAcademico);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      },
    });
  }

  // Função para buscar as conquistas pelo ID do acadêmico
  buscarConquistasPorIdAcademico(idAcademico: number) {
    this.conquistasService.getConquistasByUserId(idAcademico).subscribe({
      next: (conquistas: Conquista[] | null) => {
        this.conquistas = conquistas || [];
        console.log('Conquistas recebidas:', this.conquistas);
      },
      error: (err) => {
        console.error('Erro ao buscar conquistas:', err);
      },
    });
  }
}
