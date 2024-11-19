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
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  // constructor(private metaDiariaService: MetaDiariaService) {}

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
    // Chama o método putMetaDiaria para atualizar a meta
    // this.metaDiariaService.putMetaDiaria(this.meta).subscribe({
    //   next: (result) => {
    //     this.closeModal(); // Fecha o modal após a atualização
    //   },
    //   error: (err) => {
    //     console.error('Erro ao atualizar meta:', err);
    //   },
    // });
  }
}
