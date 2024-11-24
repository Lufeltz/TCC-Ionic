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
import { AlertController } from '@ionic/angular'; // Importando o AlertController
import { Academico } from 'src/app/models/academico.model';
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
  @Input() user!: Academico; // Recebe a meta a ser editada
  @Output() close = new EventEmitter<void>(); // Evento para fechar o modal

  @Input() verificarProgresso!: (meta: MetaDiaria) => void; // Método para verificar progresso
  @Input() excluirPresentAlert!: (meta: MetaDiaria) => void; //
  @Input() excluirMetaConfirmada!: (id: string) => void; //
    @Input() listarMetaDiarias!: () => void; //
  @Output() metaExcluida = new EventEmitter<void>(); 

  constructor(private metaDiariaService: MetaDiariaService,
    private alertController: AlertController,
  ) {}

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



  editarDados() {
    this.metaDiariaService.putMetaDiaria(this.meta).subscribe({
      next: (result) => {
        this.verificarProgresso(this.meta); // Chama o método do pai para verificar o progresso
        // this.listarMetaDiarias(); // Chama o método do pai para listar as metas atualizadas
        this.closeModal(); // Fecha o modal após a atualização
      },
      error: (err) => {
        console.error('Erro ao atualizar meta:', err);
      },
    });
  }
  
}
