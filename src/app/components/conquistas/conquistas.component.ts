import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Award, CircleDashed, Ellipsis, LucideAngularModule, NotebookText, SignalHigh, Target } from 'lucide-angular';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class ConquistasComponent implements OnInit {
  estatisticasEsportivas = [
    {
      esporte: 'Futebol',
      estatisticas: [
        {
          titulo: 'O Bruxo!',
          descricao: 'Ao marcar 50 gols',
          progresso: 10,
          objetivo: 50,
          completo: true,
        },
        {
          titulo: 'O Maestro dos Passes!',
          descricao: 'Ao fornecer 20 assistências decisivas',
          progresso: 5,
          objetivo: 20,
          completo: true,
        },
        {
          titulo: 'Paredão!',
          descricao: 'Ao realizar 20 defesas',
          progresso: 8,
          objetivo: 20,
          completo: false,
        },
        {
          titulo: 'Nem Neymar cobra assim!',
          descricao: 'Ao converter 5 pênaltis em gols',
          progresso: 2,
          objetivo: 5,
          completo: false,
        },
      ],
    },
    {
      esporte: 'Vôlei',
      estatisticas: [
        {
          titulo: 'A Foice!',
          descricao: 'Ao executar 30 cortes',
          progresso: 15,
          objetivo: 30,
          completo: false,
        },
        {
          titulo: 'AdBlock?!',
          descricao: 'Ao realizar 20 bloqueios',
          progresso: 10,
          objetivo: 20,
          completo: false,
        },
        {
          titulo: 'Sacou?',
          descricao: 'Ao desferir 15 saques',
          progresso: 5,
          objetivo: 15,
          completo: false,
        },
        {
          titulo: 'O Arquiteto!',
          descricao: 'Ao completar 45 levantamentos',
          progresso: 20,
          objetivo: 45,
          completo: false,
        },
      ],
    },
    {
      esporte: 'Basquete',
      estatisticas: [
        {
          titulo: 'Sextou!',
          descricao: 'Ao marcar 20 cestas de dois pontos e 20 de três pontos',
          progresso: 15,
          objetivo: 40,
          completo: false,
        },
        {
          titulo: 'Travou aqui, travou ai?!',
          descricao: 'Ao realizar 20 bloqueios',
          progresso: 10,
          objetivo: 20,
          completo: true,
        },
        {
          titulo: 'Presente professor!',
          descricao: 'Ao converter 10 pontos em faltas',
          progresso: 5,
          objetivo: 10,
          completo: true,
        },
        {
          titulo: 'O Ilusionista!',
          descricao: 'Ao driblar 50 vezes sem perder a bola',
          progresso: 30,
          objetivo: 50,
          completo: true,
        },
      ],
    },
    {
      esporte: 'Tênis de Mesa',
      estatisticas: [
        {
          titulo: 'Atura ou sutura!',
          descricao: 'Ao marcar 20 pontos',
          progresso: 10,
          objetivo: 20,
          completo: true,
        },
        {
          titulo: 'Punto e basta!',
          descricao: 'Ao conseguir 9 pontos com saques',
          progresso: 4,
          objetivo: 9,
          completo: true,
        },
        {
          titulo: 'Seis tá brincando!',
          descricao: 'Ao conquistar 30 pontos com o backhand',
          progresso: 20,
          objetivo: 30,
          completo: false,
        },
        {
          titulo: 'É o big five?',
          descricao:
            'Ao vencer 5 jogos sem deixar o adversário marcar nenhum ponto',
          progresso: 2,
          objetivo: 5,
          completo: false,
        },
      ],
    },
  ];

  readonly Award = Award;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly CircleDashed = CircleDashed;
  readonly SignalHigh = SignalHigh;

  constructor() {}

  ngOnInit() {}
}
