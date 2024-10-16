import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ConquistasComponent  implements OnInit {

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
          link: 'https://images.unsplash.com/photo-1544723798-e0d64c4f6f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'O Maestro dos Passes!',
          descricao: 'Ao fornecer 20 assistências decisivas',
          progresso: 5,
          objetivo: 20,
          completo: true,
          link: 'https://images.unsplash.com/photo-1571841233157-c65461a8f69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Paredão!',
          descricao: 'Ao realizar 20 defesas',
          progresso: 8,
          objetivo: 20,
          completo: false,
          link: 'https://images.unsplash.com/photo-1509476461432-f8a706fc4e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Nem Neymar cobra assim!',
          descricao: 'Ao converter 5 pênaltis em gols',
          progresso: 2,
          objetivo: 5,
          completo: false,
          link: 'https://images.unsplash.com/photo-1559706886-2614b7f9e42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
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
          link: 'https://images.unsplash.com/photo-1599462580748-520cf4ed97f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'AdBlock?!',
          descricao: 'Ao realizar 20 bloqueios',
          progresso: 10,
          objetivo: 20,
          completo: false,
          link: 'https://images.unsplash.com/photo-1577751253992-73586529b51d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Sacou?',
          descricao: 'Ao desferir 15 saques',
          progresso: 5,
          objetivo: 15,
          completo: false,
          link: 'https://images.unsplash.com/photo-1559603848-1e5290c2f6af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'O Arquiteto!',
          descricao: 'Ao completar 45 levantamentos',
          progresso: 20,
          objetivo: 45,
          completo: false,
          link: 'https://images.unsplash.com/photo-1601633941733-885e2537a657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
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
          link: 'https://images.unsplash.com/photo-1508701269421-d2f1d29b93de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Travou aqui, travou ai?!',
          descricao: 'Ao realizar 20 bloqueios',
          progresso: 10,
          objetivo: 20,
          completo: true,
          link: 'https://images.unsplash.com/photo-1524698136761-7229b3733ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Presente professor!',
          descricao: 'Ao converter 10 pontos em faltas',
          progresso: 5,
          objetivo: 10,
          completo: true,
          link: 'https://images.unsplash.com/photo-1580529190925-43d54b172048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'O Ilusionista!',
          descricao: 'Ao driblar 50 vezes sem perder a bola',
          progresso: 30,
          objetivo: 50,
          completo: true,
          link: 'https://images.unsplash.com/photo-1524504385427-3b73f6b7d9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
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
          link: 'https://images.unsplash.com/photo-1598383117963-27e4bb9e4e35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Punto e basta!',
          descricao: 'Ao conseguir 9 pontos com saques',
          progresso: 4,
          objetivo: 9,
          completo: true,
          link: 'https://images.unsplash.com/photo-1501802369692-08f2c2bafec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'Seis tá brincando!',
          descricao: 'Ao conquistar 30 pontos com o backhand',
          progresso: 20,
          objetivo: 30,
          completo: false,
          link: 'https://images.unsplash.com/photo-1573090671950-8b487d344b73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
          titulo: 'É o big five?',
          descricao: 'Ao vencer 5 jogos sem deixar o adversário marcar nenhum ponto',
          progresso: 2,
          objetivo: 5,
          completo: false,
          link: 'https://images.unsplash.com/photo-1600509237881-63c7b637c1e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
        },
      ],
    },
  ];
  


  constructor() { }

  ngOnInit() {}

}
