import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/post.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { PostApiResponse } from 'src/app/models/post-api-response.model';
import { ComentarioApiResponse } from 'src/app/models/comentario-api-response.model';
import { Comentario } from 'src/app/models/comentario.model';
import {
  ArrowDown,
  ArrowDownToDot,
  LucideAngularModule,
  MessageCircleMore,
  RotateCw,
  Star,
  UserRound,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalCurtidasComponent } from '../modal-curtidas/modal-curtidas.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; // Importar o AuthService
import { Academico } from 'src/app/models/academico.model'; // Importar o modelo Academico

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LucideAngularModule,
    ModalCurtidasComponent,
    FormsModule,
  ],
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() searchedPosts!: string;
  public filteredPublications: any[] = [];
  public modalCurtidasVisible = false;
  public curtidasParaExibir: any[] = [];
  public novoComentario: { [key: string]: string } = {};
  private currentPage = 0;
  private pageSize = 10;
  private comentarioSize = 5;
  public usuarioLogado: Academico | null = null; // Adicionar propriedade para o usuário logado

  readonly RotateCw = RotateCw;
  readonly UserRound = UserRound;
  readonly Star = Star;
  readonly ArrowDownToDot = ArrowDownToDot;
  readonly MessageCircleMore = MessageCircleMore;

  constructor(
    private _http: HttpClient,
    private postsService: PostService,
    private comentarioService: ComentarioService,
    private authService: AuthService // Injetar AuthService
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
    if (this.usuarioLogado) {
      if (!publicacao.isCurtiu) {
        publicacao.listaUsuarioCurtida.push({
          nome: this.usuarioLogado.nome,
          username: this.usuarioLogado.username,
        });
        publicacao.isCurtiu = true;
      } else {
        publicacao.listaUsuarioCurtida = publicacao.listaUsuarioCurtida.filter(
          (usuario: any) => usuario.username !== this.usuarioLogado?.username
        );
        publicacao.isCurtiu = false;
      }
      console.log(publicacao.listaUsuarioCurtida);
    }
  }

  curtirComentario(comentario: any, publicacao: any) {
    if (this.usuarioLogado) {
      if (!comentario.isCurtiu) {
        this.comentarioService.curtirComentario(this.usuarioLogado.idAcademico, comentario.idComentario)
          .subscribe(
            (response) => {
              comentario.listaUsuarioCurtida.push({
                nome: this.usuarioLogado!.nome,
                username: this.usuarioLogado!.username,
              });
              comentario.isCurtiu = true;
            },
            (error) => {
              console.error('Erro ao curtir o comentário', error);
            }
          );
      } else {
        this.comentarioService.removerCurtidaComentario(this.usuarioLogado.idAcademico, comentario.idComentario)
          .subscribe(
            (response) => {
              comentario.listaUsuarioCurtida = comentario.listaUsuarioCurtida.filter(
                (usuario: any) => usuario.username !== this.usuarioLogado?.username
              );
              comentario.isCurtiu = false;
            },
            (error) => {
              console.error('Erro ao remover curtida do comentário', error);
            }
          );
      }
      console.log(comentario.listaUsuarioCurtida);
    }
  }

  abrirModalCurtidas(listaCurtidas: any[]) {
    this.curtidasParaExibir = listaCurtidas;
    this.modalCurtidasVisible = true;
  }

  closeModal() {
    this.modalCurtidasVisible = false;
  }

  ngOnInit() {
    this.authService.getAcademicoLogado().subscribe(
      (usuario) => {
        this.usuarioLogado = usuario;
        this.listarPosts(); // Carregar posts após obter o usuário logado
      },
      (err) => {
        console.error('Erro ao obter usuário logado', err);
      }
    );
  }

  listarPosts() {
    this.postsService.getAllPosts(this.currentPage, this.pageSize).subscribe(
      (response: PostApiResponse) => {
        console.log(response.content);
        if (response && response.content.length > 0) {
          this.filteredPublications = [
            ...this.filteredPublications,
            ...response.content,
          ];
          this.currentPage++;
          this.listarComentarios();
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
            console.log(response.content);
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
            publicacao.currentPage = nextPage;
          }
        },
        (err) => {
          console.error('Erro ao carregar mais comentários', err);
        }
      );
  }

  comentar(publicacao: any) {
    const novoComentarioTexto = this.novoComentario[publicacao.idPublicacao];
    if (!novoComentarioTexto || !this.usuarioLogado) {
      return;
    }

    const comentario: Comentario = {
      idComentario: 0,
      descricao: novoComentarioTexto,
      dataComentario: new Date(),
      idPublicacao: publicacao.idPublicacao,
      Usuario: {
        idUsuario: this.usuarioLogado.idAcademico, // ID do usuário logado
        username: this.usuarioLogado.username, // Username do usuário logado
        nome: this.usuarioLogado.nome, // Nome do usuário logado
        foto: this.usuarioLogado.foto || null,
        permissao: this.usuarioLogado.permissao, // Permissão do usuário logado
      },
      listaUsuarioCurtida: [],
    };

    console.log(comentario)

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
