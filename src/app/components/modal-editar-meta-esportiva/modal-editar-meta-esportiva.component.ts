import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  IonButton,
  IonLabel,
  IonInput,
  IonToast,
} from '@ionic/angular/standalone';
import {
  CaseUpper,
  CircleX,
  Goal,
  LucideAngularModule,
  NotebookText,
  Ruler,
  Save,
  Target,
} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Conquista } from 'src/app/models/conquista.model';
import { ConquistasService } from 'src/app/services/conquistas.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-modal-editar-meta-esportiva',
  templateUrl: './modal-editar-meta-esportiva.component.html',
  styleUrls: ['./modal-editar-meta-esportiva.component.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonInput,
    IonLabel,
    IonButton,
    CommonModule,
    LucideAngularModule,
    FormsModule,
  ],
})
export class ModalEditarMetaEsportivaComponent {
  constructor(
    private conquistasService: ConquistasService,
    private stateService: StateService
  ) {}
  @Input() conquistaEsportiva!: Conquista;
  @Input() modalidadesUsuario!: any[];
  @Input() listarMetasEsportivas!: () => void;

  @Output() close = new EventEmitter<void>();

  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly Ruler = Ruler;
  readonly Save = Save;
  readonly Goal = Goal;

  editarProgresso() {
    this.conquistasService
      .atualizarConquista(this.conquistaEsportiva)
      .subscribe({
        next: (response) => {
          this.stateService.triggerUpdateListarMetasEsportivas();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao atualizar a conquista:', err);
        },
      });
  }

  closeModal() {
    this.close.emit();
  }
}
