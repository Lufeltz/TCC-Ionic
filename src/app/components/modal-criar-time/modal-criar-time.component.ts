import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CaseUpper,
  CircleX,
  Key,
  LucideAngularModule,
  Save,
} from 'lucide-angular';
import { IonButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { CriarTime } from 'src/app/models/criar-time.model';
import { PartidaService } from 'src/app/services/partida.service';
import { Campeonato } from 'src/app/models/campeonato.model';
import { Academico } from 'src/app/models/academico.model';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-modal-criar-time',
  templateUrl: './modal-criar-time.component.html',
  styleUrls: ['./modal-criar-time.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonButton,
    CommonModule,
    LucideAngularModule,
    FormsModule,
  ],
})
export class ModalCriarTimeComponent implements OnInit {
  constructor(
    private partidaService: PartidaService,
    private authService: AuthService,
    private stateService: StateService
  ) {}
  
  @Input() idCampeonato!: number;
  @Input() campeonato!: Campeonato | null;
  @Output() close = new EventEmitter<void>();

  time: CriarTime = new CriarTime();
  user: Academico = new Academico();

  readonly Save = Save;
  readonly Key = Key;
  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;

  ngOnInit() {
    const user = this.authService.getUser();

    if (user) {
      this.user = user;
    } else {
      console.error('Usuário não autenticado ou não encontrado.');
    }

    if (this.idCampeonato) {
      this.time.campeonato = this.idCampeonato;
    } else {
      console.error('ID do campeonato não fornecido.');
    }
  }

  criarTime() {
    if (this.campeonato && this.campeonato.limiteParticipantes === 1) {
      const senha =
        this.campeonato.privacidadeCampeonato === 'PRIVADO'
          ? this.time.senhaCampeonato || undefined
          : undefined;

      this.partidaService
        .criarTimeIndividual(this.idCampeonato, this.user.idAcademico, senha)
        .subscribe({
          next: (response) => {
            this.stateService.triggerUpdateListagemTimes();
            this.stateService.triggerUpdateListagemJogadores();
            this.stateService.triggerUpdateListagemCampeonatos();
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao criar time individual:', err);
          },
        });
    } else if (this.campeonato && this.campeonato.limiteParticipantes !== 1) {
      this.partidaService.inscreverTime(this.time).subscribe({
        next: (response) => {
          this.stateService.triggerUpdateListagemTimes();
          this.stateService.triggerUpdateListagemJogadores();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao inscrever o time:', err);
        },
      });
    } else {
      console.error('Informações do campeonato inválidas.');
    }
  }

  closeModal() {
    this.close.emit();
  }
}
