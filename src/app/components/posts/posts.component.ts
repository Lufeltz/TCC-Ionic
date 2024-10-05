import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PostsComponent implements OnInit {
  academicos = {
    listaPublicacao: [
      {
        descricao:
          'alguém afim de jogar um pingas amanhã? Se quiserem, eu vou criar um campeonato pra nós depois.',
        dataPublicacao: '2024-09-17T10:37:24Z',
        idCanal: 1,
        Usuario: {
          username: 'math_aa',
          nome: 'Matheus Antônio Augusto',
          foto: null,
          permissao: 'ACADEMICO',
        },
        listaUsuarioCurtida: [
          {
            username: 'michael_ac',
            nome: 'Michael Andrew Curry',
            foto: null,
            permissao: 'ACADEMICO',
          },
          {
            username: 'maira_sm',
            nome: 'Maíra Silverado Mendes',
            foto: null,
            permissao: 'ACADEMICO',
          },
          {
            username: 'marcelo_ls',
            nome: 'Marcelo Leite Silveira',
            foto: null,
            permissao: 'ACADEMICO',
          },
          {
            username: 'muriel_ln',
            nome: 'Muriel Leon Nogueira',
            foto: null,
            permissao: 'ACADEMICO',
          },
          {
            username: 'michaela_ac',
            nome: 'Michaela Antonela Churatto',
            foto: null,
            permissao: 'ACADEMICO',
          },
          {
            username: 'mauro_vm',
            nome: 'Mauro Vieira Marçal',
            foto: null,
            permissao: 'ACADEMICO',
          },
        ],
        listaComentario: [
          {
            descricao: 'Eu consigo amanhã, bora bora',
            dataComentario: '2024-09-17T10:37:24Z',
            Usuario: {
              username: 'maria_gn',
              nome: 'Maria Gabriela Naste',
              foto: null,
              permissao: 'ACADEMICO',
            },
            listaUsuarioCurtida: [
              {
                username: 'math_aa',
                nome: 'Matheus Antônio Augusto',
                foto: null,
                permissao: 'ACADEMICO',
              },
              {
                username: 'mauro_vm',
                nome: 'Mauro Vieira Marçal',
                foto: null,
                permissao: 'ACADEMICO',
              },
            ],
          },
          {
            descricao: 'quase certeza que sim',
            dataComentario: '2024-09-17T10:37:24Z',
            Usuario: {
              username: 'marcelo_ls',
              nome: 'Marcelo Leite Silveira',
              foto: null,
              permissao: 'ACADEMICO',
            },
            listaUsuarioCurtida: [
              {
                username: 'murilo_scn',
                nome: 'Murilo Souza Costa Neto',
                foto: null,
                permissao: 'ACADEMICO',
              },
            ],
          },
          {
            descricao: 'consigo depois das 18h',
            dataComentario: '2024-09-17T10:37:24Z',
            Usuario: {
              username: 'muriel_ln',
              nome: 'Muriel Leon Nogueira',
              foto: null,
              permissao: 'ACADEMICO',
            },
            listaUsuarioCurtida: [],
          },
          {
            descricao:
              'Vai ser dahora piazada, vou criar o campeonato às 18h então.',
            dataComentario: '2024-09-17T10:37:24Z',
            Usuario: {
              username: 'math_aa',
              nome: 'Matheus Antônio Augusto',
              foto: null,
              permissao: 'ACADEMICO',
            },
            listaUsuarioCurtida: [],
          },
        ],
      },
    ],
  };

  constructor() {}

  ngOnInit() {}
}
