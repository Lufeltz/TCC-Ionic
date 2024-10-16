import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estatisticas-esportivas',
  templateUrl: './estatisticas-esportivas.component.html',
  styleUrls: ['./estatisticas-esportivas.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class EstatisticasEsportivasComponent implements OnInit {
  estatisticasEsportivas = [
    {
      nome: 'Participação em Campeonatos',
      valor: 2,
    },
    {
      nome: 'Metas Diárias Realizadas',
      valor: 4,
    },
    {
      nome: 'Metas Esportivas Realizadas',
      valor: 3,
    },
    {
      nome: 'Dias Metas Realizadas em Sequência',
      valor: 2,
    },
    {
      nome: 'Vitórias em Campeonatos',
      valor: 15,
    },
    {
      nome: 'Metas Parcialmente Realizadas',
      valor: 2,
    },
    {
      nome: 'Média de Metas Realizadas por Semana',
      valor: 5,
    },
    {
      nome: 'Metas Não Realizadas',
      valor: 2,
    },
    {
      nome: 'Novas Metas Criadas',
      valor: 6,
    },
  ];
  

  constructor() {}

  ngOnInit() {}
}
