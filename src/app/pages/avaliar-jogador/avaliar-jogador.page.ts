import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { star, starOutline, starHalfOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ChartColumn, LucideAngularModule, MousePointerClick, Save, Star, StarHalf, User, Volleyball } from 'lucide-angular';

@Component({
  selector: 'app-avaliar-jogador',
  templateUrl: './avaliar-jogador.page.html',
  styleUrls: ['./avaliar-jogador.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    LucideAngularModule,
  ],
})
export class AvaliarJogadorPage implements OnInit {
  pageTitle: string = 'Avaliar Jogador';
  pageMenu: string = 'avaliar-jogador';
  pageContent: string = 'avaliar-jogador';

  readonly Star = Star;
  readonly StarHalf = StarHalf;
  readonly User = User;
  readonly Volleyball = Volleyball;
  readonly ChartColumn = ChartColumn;
  readonly MousePointerClick = MousePointerClick;
  readonly Save = Save;

  avaliacoes: number[] = [
    5, 4, 5, 3, 4, 4, 5, 3, 5, 5, 5, 4, 5, 4, 3, 2, 4, 5, 4, 3, 2, 3, 4,
  ]; // Array de avaliações
  mediaAtual: number = 0; // Média inicial
  quantidadeEstrelas: number = 0;
  temEstrelaMeia: boolean = false;

  selectedRating: number = 0; // Valor da avaliação selecionada pelo usuário
  stars: number[] = [1, 2, 3, 4, 5]; // Array de estrelas para o ngFor

  constructor() {
    addIcons({ star, starHalfOutline, starOutline });
  }

  ngOnInit() {
    this.calcularMedia(); // Calcula a média na inicialização
  }

  calcularMedia() {
    const totalAvaliacoes = this.avaliacoes.length;
    const somaAvaliacoes = this.avaliacoes.reduce((acc, nota) => acc + nota, 0);

    this.mediaAtual =
      totalAvaliacoes > 0 ? somaAvaliacoes / totalAvaliacoes : 0; // Previne divisão por zero
    this.quantidadeEstrelas = Math.floor(this.mediaAtual); // Estrelas cheias

    // Verifica se a média está em um intervalo que requer uma estrela meia
    this.temEstrelaMeia = this.mediaAtual % 1 >= 0.5 && this.mediaAtual % 1 < 1; // Para valores como 0.5, 1.5, 2.5, etc.
  }

  rate(stars: number) {
    this.selectedRating = stars; // Atualiza a avaliação selecionada
    console.log(`Estrela clicada: ${stars}`); // Log da estrela clicada
    // Você pode também recalcular a média se desejar
    this.calcularMedia(); // (Opcional)
  }

  saveRating() {
    this.avaliacoes.push(this.selectedRating);
    this.calcularMedia();
    console.log('Avaliação salva:', this.selectedRating);
  }
}
