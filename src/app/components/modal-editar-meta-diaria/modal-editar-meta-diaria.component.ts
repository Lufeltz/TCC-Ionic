import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { FormsModule } from '@angular/forms';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';

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
  @Input() meta!: MetaDiaria; // Recebe a meta a ser editada
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  constructor(private metaDiariaService: MetaDiariaService) {

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
    // Chama o método putMetaDiaria para atualizar a meta
    this.metaDiariaService.putMetaDiaria(this.meta).subscribe({
      next: (result) => {
        console.log('Meta atualizada com sucesso:', result);
        this.closeModal(); // Fecha o modal após a atualização
      },
      error: (err) => {
        console.error('Erro ao atualizar meta:', err);
      }
    });
  }
  
}
