import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { CircleX, LucideAngularModule, Star, User } from 'lucide-angular';

@Component({
  selector: 'app-modal-curtidas',
  templateUrl: './modal-curtidas.component.html',
  styleUrls: ['./modal-curtidas.component.scss'],
  imports: [IonButton, IonContent, CommonModule, LucideAngularModule],
  standalone: true,
})
export class ModalCurtidasComponent {
  @Input() listaUsuarioCurtida: any[] = [];
  @Output() close = new EventEmitter<void>();
  readonly User = User;
  readonly Star = Star;
  readonly CircleX = CircleX;

  closeModal() {
    this.close.emit();
  }
}
