import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  heart,
  chevronDownOutline,
  starOutline,
  star,
} from 'ionicons/icons';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PostsComponent implements OnInit {
  @Input() searchedPosts!: string;
  public filteredPublications: any[] = [];

  constructor() {
    addIcons({ heartOutline, heart, chevronDownOutline, star, starOutline });
  }

  academicos = {
    listaPublicacao: [
      {
        descricao:
          'alguém afim de jogar um fut amanhã? Se quiserem, eu vou criar um campeonato pra nós depois.',
        dataPublicacao: '2024-09-17T10:37:24Z',
        idCanal: 1,
        Usuario: {
          username: 'lucas_kz',
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
            dataComentario: '2024-09-17T10:42:04Z',
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
            dataComentario: '2024-09-17T10:36:11Z',
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
            dataComentario: '2024-09-17T10:55:02Z',
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
      {
        descricao:
          'alguém afim de jogar um pingas amanhã? Se quiserem, eu vou criar um campeonato pra nós depois.',
        dataPublicacao: '2024-09-17T11:42:20Z',
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
            dataComentario: '2024-09-17T12:37:14Z',
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
            dataComentario: '2024-09-17T12:40:16Z',
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
            dataComentario: '2024-09-17T16:55:22Z',
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

  ngOnInit() {
    this.filterPublications(); 
  }

  ngOnChanges() {
    this.filterPublications(); 
  }

  filterPublications() {
    const searchTerm = this.searchedPosts.toLowerCase();
    this.filteredPublications = this.academicos.listaPublicacao.filter(
      (publicacao) =>
        publicacao.descricao.toLowerCase().includes(searchTerm) ||
        publicacao.Usuario.username.toLowerCase().includes(searchTerm)
    );
  }

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
