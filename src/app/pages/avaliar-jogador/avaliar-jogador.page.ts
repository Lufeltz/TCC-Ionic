import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon, IonButton, IonToast } from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { star, starOutline, starHalfOutline, caretDownOutline, caretUpOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-avaliar-jogador',
  templateUrl: './avaliar-jogador.page.html',
  styleUrls: ['./avaliar-jogador.page.scss'],
  standalone: true,
  imports: [IonToast, IonButton, 
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
  ],
})
export class AvaliarJogadorPage implements OnInit {
  pageTitle: string = 'Avaliar Jogador';
  pageMenu: string = 'avaliar-jogador';
  pageContent: string = 'avaliar-jogador';

  avaliacoes: number[] = [5, 4, 3, 5, 4, 2, 1, 4, 5, 5, 3, 2, 3]; // Array de avaliações
  mediaAtual: number = 0; // Média inicial
  quantidadeEstrelas: number = 0;
  temEstrelaMeia: boolean = false;

  selectedValue: string = ''; // Valor selecionado
  isOpen: boolean = false; // Estado do select

  constructor() {
    addIcons({ caretDownOutline, caretUpOutline, star, starHalfOutline, starOutline });
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
    this.temEstrelaMeia =
      (this.mediaAtual >= 3.5 && this.mediaAtual < 4) ||
      (this.mediaAtual >= 4.5 && this.mediaAtual < 5); // Estrela meia
  }

  handleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Valor selecionado:', selectedValue);
    // Adicione sua lógica aqui
    this.isOpen = false; // Fecha o select após a seleção
  }

  handleFocus() {
    this.isOpen = true; // Abre o select ao focar
  }

  handleBlur() {
    this.isOpen = false; // Fecha o select ao perder foco
  }

  toggleSelect() {
    this.isOpen = !this.isOpen; // Alterna o estado do select
  }
}
