import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
import { IonButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { FormsModule } from '@angular/forms';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { AlertController } from '@ionic/angular';
import { Academico } from 'src/app/models/academico.model';
import { StateService } from 'src/app/services/state.service';
@Component({
  selector: 'app-modal-editar-meta-diaria',
  templateUrl: './modal-editar-meta-diaria.component.html',
  styleUrls: ['./modal-editar-meta-diaria.component.scss'],
  imports: [
    IonInput,
    IonLabel,
    IonButton,
    CommonModule,
    LucideAngularModule,
    FormsModule,
  ],
  standalone: true,
})
export class ModalEditarMetaDiariaComponent {
  constructor(
    private metaDiariaService: MetaDiariaService,
    private alertController: AlertController,
    private stateService: StateService
  ) {}

  @Input() meta!: MetaDiaria;
  @Input() user!: Academico;
  @Output() close = new EventEmitter<void>();

  @Input() verificarProgresso!: (meta: MetaDiaria) => void;
  @Input() excluirPresentAlert!: (meta: MetaDiaria) => void; //
  @Input() excluirMetaConfirmada!: (id: string) => void; //
  @Input() listarMetaDiarias!: () => void; //
  @Output() metaExcluida = new EventEmitter<void>();

  readonly CircleX = CircleX;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly Ruler = Ruler;
  readonly Save = Save;
  readonly Goal = Goal;

  editarDados() {
    this.metaDiariaService.putMetaDiaria(this.meta).subscribe({
      next: (result) => {
        this.verificarProgresso(this.meta);

        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao atualizar meta:', err);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}
