import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CaseUpper, CircleX, Key, LucideAngularModule, Save } from 'lucide-angular';
import { IonButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { CriarTime } from 'src/app/models/criar-time.model';
import { PartidaService } from 'src/app/services/partida.service';
import { Campeonato } from 'src/app/models/campeonato.model';

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

  constructor(private partidaService: PartidaService) {}

  readonly Save = Save;
  readonly Key = Key;
  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;

  ngOnInit() {
    // Garantir que o idCampeonato seja atribuído ao time no momento da inicialização
    console.log('id do campeonato vindo', this.idCampeonato);
    if (this.idCampeonato) {
      this.time.campeonato = this.idCampeonato;
    } else {
      console.error('ID do campeonato não fornecido.');
    }
  }

  closeModal() {
    this.close.emit(); // Emite o evento para fechar o modal
  }

  criarTime() {
    // Verifica se os valores estão sendo atribuídos corretamente antes de enviar
    console.log('Dados do time antes de enviar:', this.time);

    // Envia o objeto time para o serviço
    this.partidaService.inscreverTime(this.time).subscribe({
      next: (response) => {
        console.log('Time inscrito com sucesso:', response);
        this.closeModal(); // Fecha o modal após a inscrição
      },
      error: (err) => {
        console.error('Erro ao inscrever o time:', err);
      },
    });
  }
}
