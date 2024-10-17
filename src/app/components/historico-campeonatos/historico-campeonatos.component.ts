import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico-campeonatos',
  templateUrl: './historico-campeonatos.component.html',
  styleUrls: ['./historico-campeonatos.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HistoricoCampeonatosComponent implements OnInit {
  historicoCampeonatos = [
    {
      nome: 'Pingas no SEPT',
      resultado: 'Campeão',
      posicao: 1,
      data: '15/09/2024',
      descricao: 'Jogo às 15h valendo 10 reais.',
      modalidade: 'Ping Pong',
    },
    {
      nome: 'SEPT x EF',
      resultado: 'Vice-campeão',
      posicao: 2,
      data: '30/07/2024',
      descricao: '5 na linha 1 no gol 16h, no campo próximo à pista de corrida',
      modalidade: 'Futebol',
    },
    {
      nome: 'Vôlei de areia',
      resultado: 'Semifinalista',
      posicao: 4,
      data: '20/09/2024',
      descricao: 'Campeonato valendo uma coca',
      modalidade: 'Vôlei',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
