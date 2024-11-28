import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
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
  @Input() conquistaEsportiva!: Conquista;
  @Input() modalidadesUsuario!: any[];
  @Input() listarMetasEsportivas!: () => void;

  @Output() close = new EventEmitter<void>();

  constructor(private conquistasService: ConquistasService) {}

  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly Ruler = Ruler;
  readonly Save = Save;
  readonly Goal = Goal;

  closeModal() {
    this.close.emit();
  }

  editarProgresso() {
    this.conquistasService
      .atualizarConquista(this.conquistaEsportiva)
      .subscribe({
        next: (response) => {
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao atualizar a conquista:', err);
        },
      });
  }
}
