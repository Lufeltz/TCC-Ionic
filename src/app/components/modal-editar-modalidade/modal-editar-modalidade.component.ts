import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CaseUpper,
  CircleX,
  LucideAngularModule,
  NotebookText,
  Ruler,
  Save,
  Target
} from 'lucide-angular';

import { IonButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-editar-modalidade',
  templateUrl: './modal-editar-modalidade.component.html',
  styleUrls: ['./modal-editar-modalidade.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonButton,
    CommonModule,
    LucideAngularModule,
    FormsModule,
    LucideAngularModule
  ],
})
export class ModalEditarModalidadeComponent{

  @Input() modalidade!: any; // Recebe a meta a ser editada
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  constructor() {

  }

  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly Ruler = Ruler;
  readonly Save = Save;

  closeModal() {
    this.close.emit(); // Emite o evento para fechar o modal
  }

  editarDados() {
  //   // Chama o método putMetaDiaria para atualizar a meta
  //   this.metaDiariaService.putMetaDiaria(this.meta).subscribe({
  //     next: (result) => {
  //       console.log('Meta atualizada com sucesso:', result);
  //       this.closeModal(); // Fecha o modal após a atualização
  //     },
  //     error: (err) => {
  //       console.error('Erro ao atualizar meta:', err);
  //     }
  //   });
  }
}
