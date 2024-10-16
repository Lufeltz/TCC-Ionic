import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PostsComponent implements OnInit {
  constructor() {
    addIcons({ heartOutline, heart });
  }

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
        isCurtiu: false, // Propriedade para controlar se o usuário curtiu a publicação
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
            isCurtiu: false, // Propriedade para controlar se o usuário curtiu o comentário
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
            isCurtiu: false, // Propriedade para controlar se o usuário curtiu o comentário
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
            isCurtiu: false, // Propriedade para controlar se o usuário curtiu o comentário
            listaUsuarioCurtida: [],
          },
        ],
      },
      // Adicione mais objetos de publicação conforme necessário
    ],
  };

  ngOnInit() {}

  mostrarCurtidas(publicacao: any) {
    console.log(publicacao.listaUsuarioCurtida);
  }
  // Método para curtir uma publicação
  curtir(publicacao: any) {
    if (!publicacao.isCurtiu) {
      // Aumenta a quantidade de curtidas
      publicacao.listaUsuarioCurtida.push({
        nome: 'Usuário atual',
        username: 'usuario_atual',
      }); // Adicione o usuário atual
      publicacao.isCurtiu = true; // Marca a publicação como curtida
    } else {
      // Remova o usuário da lista de curtidas se já tiver curtido (opcional)
      publicacao.listaUsuarioCurtida.pop(); // Remova o último usuário (ou ajuste conforme necessário)
      publicacao.isCurtiu = false; // Marca a publicação como não curtida
    }

    // Exibe no console a lista de usuários que curtiram
    console.log(publicacao.listaUsuarioCurtida);
  }

  // Método para curtir um comentário
  curtirComentario(comentario: any) {
    if (!comentario.isCurtiu) {
      // Aumenta a quantidade de curtidas
      comentario.listaUsuarioCurtida.push({
        nome: 'Usuário atual',
        username: 'usuario_atual',
      }); // Adicione o usuário atual
      comentario.isCurtiu = true; // Marca o comentário como curtido
    } else {
      // Remova o usuário da lista de curtidas se já tiver curtido (opcional)
      comentario.listaUsuarioCurtida.pop(); // Remova o último usuário (ou ajuste conforme necessário)
      comentario.isCurtiu = false; // Marca o comentário como não curtido
    }

    // Exibe no console a lista de usuários que curtiram
    console.log(comentario.listaUsuarioCurtida);
  }
}
