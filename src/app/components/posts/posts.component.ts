import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/post.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { PostApiResponse } from 'src/app/models/post-api-response.model';
import { ComentarioApiResponse } from 'src/app/models/comentario-api-response.model';
import { Comentario } from 'src/app/models/comentario.model'; // Certifique-se de que o caminho esteja correto
import { ArrowDown, ArrowDownToDot, LucideAngularModule, MessageCircleMore, RotateCw, Star, UserRound } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Adicionado o IonicModule
import { ModalCurtidasComponent } from '../modal-curtidas/modal-curtidas.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,  // Adicionando o módulo Ionic
    LucideAngularModule,
    ModalCurtidasComponent,
    FormsModule
  ],
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() searchedPosts!: string;
  public filteredPublications: any[] = [];
  public modalCurtidasVisible = false;
  public curtidasParaExibir: any[] = [];
  public novoComentario: { [key: string]: string } = {}; // Para armazenar novos comentários
  private currentPage = 0;
  private pageSize = 10;
  private comentarioSize = 5;

  readonly RotateCw = RotateCw;
  readonly UserRound = UserRound;
  readonly Star = Star;
  readonly ArrowDownToDot = ArrowDownToDot;
  readonly MessageCircleMore = MessageCircleMore;

  constructor(
    private _http: HttpClient,
    private postsService: PostService,
    private comentarioService: ComentarioService
  ) {}

  ngOnChanges() {
    this.filterPublications();
  }

  filterPublications() {
    const searchTerm = this.searchedPosts.toLowerCase();
    this.filteredPublications = this.filteredPublications.filter(
      (publicacao) =>
        publicacao.descricao.toLowerCase().includes(searchTerm) ||
        publicacao.Usuario.username.toLowerCase().includes(searchTerm)
    );
  }

  mostrarCurtidas(publicacao: any) {
    console.log(publicacao.listaUsuarioCurtida);
  }

  curtir(publicacao: any) {
    if (!publicacao.isCurtiu) {
      publicacao.listaUsuarioCurtida.push({
        nome: 'Usuário atual',
        username: 'usuario_atual',
      });
      publicacao.isCurtiu = true;
    } else {
      publicacao.listaUsuarioCurtida.pop();
      publicacao.isCurtiu = false;
    }
    console.log(publicacao.listaUsuarioCurtida);
  }

  curtirComentario(comentario: any) {
    if (!comentario.isCurtiu) {
      comentario.listaUsuarioCurtida.push({
        nome: 'Usuário atual',
        username: 'usuario_atual',
      });
      comentario.isCurtiu = true;
    } else {
      comentario.listaUsuarioCurtida.pop();
      comentario.isCurtiu = false;
    }
    console.log(comentario.listaUsuarioCurtida);
  }

  abrirModalCurtidas(listaCurtidas: any[]) {
    this.curtidasParaExibir = listaCurtidas;
    this.modalCurtidasVisible = true;
  }

  closeModal() {
    this.modalCurtidasVisible = false;
  }

  ngOnInit() {
    this.listarPosts(); // Carregar posts ao iniciar
  }

  listarPosts() {
    this.postsService.getAllPosts(this.currentPage, this.pageSize).subscribe(
      (response: PostApiResponse) => {
        console.log(response.content); // Exibe somente os posts
        if (response && response.content.length > 0) {
          this.filteredPublications = [
            ...this.filteredPublications,
            ...response.content,
          ];
          this.currentPage++; // Incrementa a página para próxima requisição
          this.listarComentarios(); // Carrega os comentários para cada post
        }
      },
      (err) => {
        console.error('Erro ao carregar posts', err);
      }
    );
  }

  listarComentarios() {
    this.filteredPublications.forEach((publicacao) => {
      this.comentarioService
        .getAllComentarios(publicacao.idPublicacao, 0, this.comentarioSize)
        .subscribe(
          (response: ComentarioApiResponse) => {
            console.log(response.content); // Exibe somente os comentários
            if (response && response.content.length > 0) {
              publicacao.listaComentario = response.content;
            } else {
              publicacao.listaComentario = [];
            }
          },
          (err) => {
            console.error('Erro ao carregar comentários', err);
          }
        );
    });
  }

  listarMaisComentarios(publicacao: any) {
    const nextPage = publicacao.currentPage + 1 || 1;
    this.comentarioService
      .getAllComentarios(publicacao.idPublicacao, nextPage, this.comentarioSize)
      .subscribe(
        (response: ComentarioApiResponse) => {
          if (response && response.content.length > 0) {
            publicacao.listaComentario = [
              ...publicacao.listaComentario,
              ...response.content,
            ];
            publicacao.currentPage = nextPage; // Atualiza a página atual para a publicação
          }
        },
        (err) => {
          console.error('Erro ao carregar mais comentários', err);
        }
      );
  }

  comentar(publicacao: any) {
    const novoComentarioTexto = this.novoComentario[publicacao.idPublicacao];
    if (!novoComentarioTexto) {
      return;
    }

    const comentario: Comentario = {
      idComentario: 0,
      descricao: novoComentarioTexto,
      dataComentario: new Date(),
      idPublicacao: publicacao.idPublicacao,
      Usuario: {
        idUsuario: 6, // Substitua pelo ID do usuário atual
        username: 'usuario_atual', // Substitua pelo username do usuário atual
        nome: 'Nome do Usuário Atual', // Substitua pelo nome do usuário atual
        foto: null,
        permissao: 'ACADEMICO', // Substitua pela permissão do usuário atual, se necessário
      },
      listaUsuarioCurtida: [],
    };

    this.comentarioService.postComentario(comentario).subscribe(
      (comentarioCriado) => {
        if (comentarioCriado) {
          publicacao.listaComentario.push(comentarioCriado);
          this.novoComentario[publicacao.idPublicacao] = ''; // Limpa o campo de comentário
        }
      },
      (err) => {
        console.error('Erro ao postar comentário', err);
      }
    );
  }
}
