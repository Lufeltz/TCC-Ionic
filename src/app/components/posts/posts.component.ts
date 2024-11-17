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
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { PublicacaoService } from 'src/app/services/publicacao.service'; // Importar PublicacaoService

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
  public usuarioLogado: Academico | null = null;

  readonly RotateCw = RotateCw;
  readonly UserRound = UserRound;
  readonly Star = Star;
  readonly ArrowDownToDot = ArrowDownToDot;
  readonly MessageCircleMore = MessageCircleMore;

  constructor(
    private _http: HttpClient,
    private postsService: PostService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private publicacaoService: PublicacaoService // Injetar PublicacaoService
  ) {}

  ngOnChanges() {
    this.filterPublications();
  }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();
    if (this.usuarioLogado) {
      this.listarPosts();
    } else {
      console.error('Usuário não logado');
    }
  }

  filterPublications() {
    const searchTerm = this.searchedPosts.toLowerCase();
    this.filteredPublications = this.filteredPublications.filter(
      (publicacao) =>
        publicacao.descricao.toLowerCase().includes(searchTerm) ||
        publicacao.Usuario.username.toLowerCase().includes(searchTerm)
    );
  }

  mostrarCurtidas(publicacao: any) {}

  curtir(publicacao: any) {
    if (this.usuarioLogado) {
      if (!publicacao.isCurtiu) {
        this.publicacaoService
          .curtirPublicacao(
            this.usuarioLogado.idAcademico,
            publicacao.idPublicacao
          )
          .subscribe(
            (response) => {
              publicacao.listaUsuarioCurtida.push({
                nome: this.usuarioLogado!.nome,
                username: this.usuarioLogado!.username,
              });
              publicacao.isCurtiu = true;
            },
            (error) => {
              console.error('Erro ao curtir a publicação', error);
            }
          );
      } else {
        this.publicacaoService
          .removerCurtidaPublicacao(
            this.usuarioLogado.idAcademico,
            publicacao.idPublicacao
          )
          .subscribe(
            (response) => {
              publicacao.listaUsuarioCurtida =
                publicacao.listaUsuarioCurtida.filter(
                  (usuario: any) =>
                    usuario.username !== this.usuarioLogado?.username
                );
              publicacao.isCurtiu = false;
            },
            (error) => {
              console.error('Erro ao remover curtida da publicação', error);
            }
          );
      }
    }
  }

  curtirComentario(comentario: any, publicacao: any) {
    if (this.usuarioLogado) {
      if (!comentario.isCurtiu) {
        this.comentarioService
          .curtirComentario(
            this.usuarioLogado.idAcademico,
            comentario.idComentario
          )
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
        this.comentarioService
          .removerCurtidaComentario(
            this.usuarioLogado.idAcademico,
            comentario.idComentario
          )
          .subscribe(
            (response) => {
              comentario.listaUsuarioCurtida =
                comentario.listaUsuarioCurtida.filter(
                  (usuario: any) =>
                    usuario.username !== this.usuarioLogado?.username
                );
              comentario.isCurtiu = false;
            },
            (error) => {
              console.error('Erro ao remover curtida do comentário', error);
            }
          );
      }
    }
  }

  abrirModalCurtidas(listaCurtidas: any[]) {
    this.curtidasParaExibir = listaCurtidas;
    this.modalCurtidasVisible = true;
  }

  closeModal() {
    this.modalCurtidasVisible = false;
  }

  listarPosts() {
    this.postsService.getAllPosts(this.currentPage, this.pageSize).subscribe(
      (response: PostApiResponse) => {
        if (response && response.content.length > 0) {
          const newPosts = response.content.map((post) => ({
            ...post,
            isCurtiu: post.listaUsuarioCurtida.some(
              (usuario: any) =>
                usuario.username === this.usuarioLogado?.username
            ),
          }));
          this.filteredPublications = [
            ...this.filteredPublications,
            ...newPosts,
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
            if (response && response.content.length > 0) {
              publicacao.listaComentario = response.content.map(
                (comentario) => ({
                  ...comentario,
                  isCurtiu: comentario.listaUsuarioCurtida.some(
                    (usuario: any) =>
                      usuario.username === this.usuarioLogado?.username
                  ),
                })
              );
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
            const newComments = response.content.map((comentario) => ({
              ...comentario,
              isCurtiu: comentario.listaUsuarioCurtida.some(
                (usuario: any) =>
                  usuario.username === this.usuarioLogado?.username
              ),
            }));
            publicacao.listaComentario = [
              ...publicacao.listaComentario,
              ...newComments,
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
        idUsuario: this.usuarioLogado.idAcademico,
        username: this.usuarioLogado.username,
        nome: this.usuarioLogado.nome,
        foto: this.usuarioLogado.foto || null,
        permissao: this.usuarioLogado.permissao,
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
