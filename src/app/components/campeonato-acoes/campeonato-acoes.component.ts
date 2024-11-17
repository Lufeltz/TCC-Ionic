import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Ellipsis,
  ExternalLink,
  LucideAngularModule,
  User,
  Users,
} from 'lucide-angular';

import {
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-campeonato-acoes',
  templateUrl: './campeonato-acoes.component.html',
  styleUrls: ['./campeonato-acoes.component.scss'],
  imports: [
    IonToast,
    IonInput,
    IonButton,
    IonLabel,
    CommonModule,
    FormsModule,
    LucideAngularModule,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
  ],
  standalone: true,
})
export class CampeonatoAcoesComponent implements OnInit {
  times: any[] = [
    {
      numero: 'Time 1',
      jogadores: ['Jogador 1', 'Jogador 2', 'Jogador 3'],
    },
    {
      numero: 'Time 2',
      jogadores: ['Jogador A', 'Jogador B', 'Jogador C'],
    },
    {
      numero: 'Time 3',
      jogadores: ['Jogador X', 'Jogador Y', 'Jogador Z'],
    },
    {
      numero: 'Time 4',
      jogadores: ['Jogador 4', 'Jogador 5', 'Jogador 6'],
    },
    {
      numero: 'Time 5',
      jogadores: ['Jogador D', 'Jogador E', 'Jogador F'],
    },
    {
      numero: 'Time 6',
      jogadores: ['Jogador M', 'Jogador N', 'Jogador O'],
    },
    {
      numero: 'Time 7',
      jogadores: ['Jogador P', 'Jogador Q', 'Jogador R'],
    },
    {
      numero: 'Time 8',
      jogadores: ['Jogador S', 'Jogador T', 'Jogador U'],
    },
    {
      numero: 'Time 9',
      jogadores: ['Jogador 7', 'Jogador 8', 'Jogador 9'],
    },
    {
      numero: 'Time 10',
      jogadores: ['Jogador V', 'Jogador W', 'Jogador X'],
    },
    {
      numero: 'Time 11',
      jogadores: ['Jogador Y', 'Jogador Z', 'Jogador AA'],
    },
    {
      numero: 'Time 12',
      jogadores: ['Jogador BB', 'Jogador CC', 'Jogador DD'],
    },
    {
      numero: 'Time 13',
      jogadores: ['Jogador EE', 'Jogador FF', 'Jogador GG'],
    },
    {
      numero: 'Time 14',
      jogadores: ['Jogador HH', 'Jogador II', 'Jogador JJ'],
    },
    {
      numero: 'Time 15',
      jogadores: ['Jogador KK', 'Jogador LL', 'Jogador MM'],
    },
    {
      numero: 'Time 16',
      jogadores: ['Jogador NN', 'Jogador OO', 'Jogador PP'],
    },
  ];

  readonly ExternalLink = ExternalLink;
  readonly User = User;
  readonly Users = Users;
  readonly Ellipsis = Ellipsis;

  menuVisible: boolean = false;

  toggleMenu() {
    console.log('Menu de opções aberto!'); // Isso será exibido no console ao clicar no '...'
    this.menuVisible = !this.menuVisible;
  }

  sairDoCampeonato() {
    console.log('Saindo do campeonato...');
    // Implementar lógica de saída
    this.menuVisible = false;
  }

  deletarCampeonato() {
    console.log('Deletando campeonato...');
    // Implementar lógica de deletação
    this.menuVisible = false;
  }

  constructor() {}

  ngOnInit() {}

  // Este método pode ser expandido se necessário para lidar com a seleção do time
  onSelectChange(event: any) {
    console.log('Time selecionado:', event.target.value);
  }
}
