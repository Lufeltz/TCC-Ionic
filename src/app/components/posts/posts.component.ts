import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/post.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { PostApiResponse } from 'src/app/models/post-api-response.model';
import { ComentarioApiResponse } from 'src/app/models/comentario-api-response.model';
import { Comentario } from 'src/app/models/comentario.model';
import {
  ArrowDown,
  ArrowDownToDot,
  EllipsisVertical,
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
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { catchError, debounceTime, EMPTY, Subject, switchMap } from 'rxjs';

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

  searchedCampeonatos: string = '';

  searchSubject: Subject<string> = new Subject<string>();

  readonly RotateCw = RotateCw;
  readonly UserRound = UserRound;
  readonly Star = Star;
  readonly EllipsisVertical = EllipsisVertical;
  readonly ArrowDownToDot = ArrowDownToDot;
  readonly MessageCircleMore = MessageCircleMore;

  constructor(
    private postsService: PostService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private publicacaoService: PublicacaoService
  ) {}

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();
    if (this.usuarioLogado) {
      this.listarPosts();
    } else {
      console.error('Usuário não logado');
    }
    this.subscribeToSearch();
  }

  menuVisible: Boolean = false;
  menuVisibilityPublicacao: { [key: number]: boolean } = {};

  toggleMenuPublicacao(publicacaoId: number): void {
    for (const id in this.menuVisibilityPublicacao) {
      if (Number(id) !== publicacaoId) {
        this.menuVisibilityPublicacao[id] = false;
      }
    }

    this.menuVisibilityPublicacao[publicacaoId] =
      !this.menuVisibilityPublicacao[publicacaoId];
  }

  editarPublicacao(publicacaoId: number): void {
    console.log('Editando a publicação...', publicacaoId);

    this.menuVisibilityPublicacao[publicacaoId] = false;
  }

  deletarPublicacao(publicacaoId: number): void {
    console.log('Deletando publicacao...', publicacaoId);

    this.menuVisibilityPublicacao[publicacaoId] = false;
  }

  menuVisibilityComentario: { [key: number]: boolean } = {}; // Para visibilidade dos menus de comentários

  toggleMenuComentario(comentarioId: number): void {
    // Fecha todos os outros menus de comentário
    for (const id in this.menuVisibilityComentario) {
      if (Number(id) !== comentarioId) {
        this.menuVisibilityComentario[id] = false;
      }
    }

    // Alterna a visibilidade do menu de comentário
    this.menuVisibilityComentario[comentarioId] =
      !this.menuVisibilityComentario[comentarioId];
  }

  editarComentario(comentarioId: number): void {
    console.log('Editando comentário...', comentarioId);

    // Fechar o menu após a ação
    this.menuVisibilityComentario[comentarioId] = false;
  }

  deletarComentario(comentarioId: number): void {
    console.log('Deletando comentário...', comentarioId);

    // Fechar o menu após a ação
    this.menuVisibilityComentario[comentarioId] = false;
  }

  onSearchInput(event: any): void {
    this.searchedCampeonatos = event.target.value;
    this.searchSubject.next(this.searchedCampeonatos);
  }

  subscribeToSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(3000),
        switchMap((searchTerm) => {
          if (searchTerm.trim() === '') {
            return this.postsService.getAllPosts(
              this.currentPage,
              this.pageSize
            );
          } else {
            return this.publicacaoService.filtrarPublicacoes(searchTerm).pipe(
              catchError((err) => {
                console.error('Erro ao buscar publicações', err);
                return EMPTY;
              })
            );
          }
        })
      )
      .subscribe({
        next: (response) => {
          const posts = Array.isArray(response)
            ? response
            : response?.content || [];

          if (posts.length > 0) {
            const newPosts = posts.map((post: any) => ({
              ...post,
              isCurtiu: post.listaUsuarioCurtida.some(
                (usuario: any) =>
                  usuario.username === this.usuarioLogado?.username
              ),
            }));
            this.filteredPublications = newPosts;
          } else {
            this.filteredPublications = [];
          }
        },
        error: (err) => {
          console.error('Erro ao buscar publicações', err);
        },
      });
  }

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
    if (this.searchedCampeonatos.trim()) {
      this.publicacaoService
        .filtrarPublicacoes(this.searchedCampeonatos)
        .subscribe(
          (posts: any[]) => {
            if (posts && posts.length > 0) {
              const newPosts = posts.map((post) => ({
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
            console.error('Erro ao carregar posts filtrados', err);
          }
        );
    } else {
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
  }

  listarMaisPosts(): void {
    if (this.searchedCampeonatos.trim()) {
      this.publicacaoService
        .filtrarPublicacoes(this.searchedCampeonatos)
        .subscribe(
          (posts: any[]) => {
            if (posts && posts.length > 0) {
              const newPosts = posts.map((post) => ({
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
            console.error('Erro ao carregar mais posts filtrados', err);
          }
        );
    } else {
      this.postsService.getAllPosts(this.currentPage, this.pageSize).subscribe(
        (response: PostApiResponse) => {
          if (response && response.content.length > 0) {
            const newPosts = response.content.map((post: any) => ({
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
          console.error('Erro ao carregar mais posts', err);
        }
      );
    }
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
          this.novoComentario[publicacao.idPublicacao] = '';
        }
      },
      (err) => {
        console.error('Erro ao postar comentário', err);
      }
    );
  }
}
