import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
import { IonButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import {
  CaseUpper,
  CircleX,
  Goal,
  LucideAngularModule,
  NotebookText,
  Ruler,
  Save,
  Smile,
  Target,
} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Conquista } from 'src/app/models/conquista.model';
import { MetaEsportivaService } from 'src/app/services/meta-esportiva.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { ConquistasService } from 'src/app/services/conquistas.service';

@Component({
  selector: 'app-modal-editar-meta-esportiva',
  templateUrl: './modal-editar-meta-esportiva.component.html',
  styleUrls: ['./modal-editar-meta-esportiva.component.scss'],
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
export class ModalEditarMetaEsportivaComponent {
  @Input() conquistaEsportiva!: Conquista; // Recebe a meta a ser editada
  @Input() modalidadesUsuario!: any[]; // Recebe a meta a ser editada
  @Input() listarMetasEsportivas!: () => void; //

  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  constructor(private conquistasService: ConquistasService) {}

  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly Ruler = Ruler;
  readonly Save = Save;
  readonly Goal = Goal;

  closeModal() {
    this.close.emit(); // Emite o evento para fechar o modal
  }

  editarProgresso() {
    this.conquistasService
      .atualizarConquista(this.conquistaEsportiva)
      .subscribe({
        next: (response) => {
          console.log('Conquista atualizada com sucesso:', response);
          // this.listarMetasEsportivas()
          this.closeModal(); // Fecha o modal após a atualização bem-sucedida
        },
        error: (err) => {
          console.error('Erro ao atualizar a conquista:', err);
          // Exibir mensagem de erro para o usuário se necessário
        },
      });
  }
}
