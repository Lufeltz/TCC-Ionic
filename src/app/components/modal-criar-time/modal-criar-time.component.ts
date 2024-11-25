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
  @Input() idCampeonato!: number; // Recebe o ID do campeonato
  @Input() campeonato!: Campeonato | null; // Recebe o ID do campeonato
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  time: CriarTime = new CriarTime(); // Inicializa o objeto time com um valor padrão
  user: Academico = new Academico();

  constructor(
    private partidaService: PartidaService,
    private authService: AuthService
  ) {}

  readonly Save = Save;
  readonly Key = Key;
  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;

  ngOnInit() {
    // Garantir que o idCampeonato seja atribuído ao time no momento da inicialização
    const user = this.authService.getUser(); // Obtém o usuário autenticado
    console.log('id do campeonato vindo', this.idCampeonato);

    if (user) {
      this.user = user; // Atribui o usuário corretamente
      console.log('Usuário autenticado:', this.user);
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
    // Verifica se os valores estão sendo atribuídos corretamente antes de enviar
    console.log('Dados do time antes de enviar:', this.time);
    console.log('ID do usuário:', this.user.idAcademico); // Verifique se o id está correto

    // Verifica o limite de jogadores do campeonato
    if (this.campeonato && this.campeonato.limiteParticipantes === 1) {
      // Define a senha se o campeonato for privado, caso contrário, undefined
      const senha =
        this.campeonato.privacidadeCampeonato === 'PRIVADO'
          ? this.time.senhaCampeonato || undefined
          : undefined;

      // Chama o serviço criarTimeIndividual com ou sem a senha
      this.partidaService
        .criarTimeIndividual(this.idCampeonato, this.user.idAcademico, senha)
        .subscribe({
          next: (response) => {
            console.log('Time individual criado com sucesso:', response);
            this.closeModal(); // Fecha o modal após a criação
          },
          error: (err) => {
            console.error('Erro ao criar time individual:', err);
          },
        });
    } else if (this.campeonato && this.campeonato.limiteParticipantes !== 1) {
      // Chama o serviço inscreverTime
      this.partidaService.inscreverTime(this.time).subscribe({
        next: (response) => {
          console.log('Time inscrito com sucesso:', response);
          this.closeModal(); // Fecha o modal após a inscrição
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
    this.close.emit(); // Emite o evento para fechar o modal
  }
}
