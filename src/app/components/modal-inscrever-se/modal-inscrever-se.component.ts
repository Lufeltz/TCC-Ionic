import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CaseUpper, CircleX, LucideAngularModule, Save } from 'lucide-angular';
import { IonButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { Time } from 'src/app/models/time.model';
import { PartidaService } from 'src/app/services/partida.service';
import { Campeonato } from 'src/app/models/campeonato.model';

@Component({
  selector: 'app-modal-inscrever-se',
  templateUrl: './modal-inscrever-se.component.html',
  styleUrls: ['./modal-inscrever-se.component.scss'],
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
export class ModalInscreverSeComponent implements OnInit {
  constructor(private partidaService: PartidaService) {}

  @Input() idUsuario!: number; // Recebe o ID do campeonato
  @Input() time!: Time; // Recebe o ID do campeonato
  @Input() campeonato!: Campeonato | null; // Recebe o ID do campeonato
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal


  readonly CaseUpper = CaseUpper;
  readonly CircleX = CircleX;
  readonly Save = Save;

  ngOnInit() {}

  adicionarUsuario(idUsuario: number, time: Time) {
    // console.log("idusuario: ", idUsuario)
    // console.log("time: ", time);

    this.partidaService.adicionarUsuarioAoTime(idUsuario, time).subscribe({
      next: (response) => {
        console.log('Usuário adicionado ao time:', response);
        this.closeModal()
      },
      error: (error) => {
        console.error('Erro ao adicionar usuário ao time:', error);
      },
    });
  }

  closeModal() {
    this.close.emit(); // Emite o evento para fechar o modal
  }
}
