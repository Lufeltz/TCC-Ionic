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
import { LucideAngularModule, RotateCw, Star, UserRound } from 'lucide-angular';
import { ModalCurtidasComponent } from '../modal-curtidas/modal-curtidas.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { PostApiResponse } from 'src/app/models/post-api-response.model';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ComentarioApiResponse } from 'src/app/models/comentario-api-response.model';

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
  ],
})
export class PostsComponent implements OnInit {
  @Input() searchedPosts!: string;
  public filteredPublications: any[] = [];
  public modalCurtidasVisible = false;
  public curtidasParaExibir: any[] = [];
  // Nova variável para controle de paginação
  private currentPage = 0;
  private pageSize = 10;
  private comentarioSize= 5;

  readonly RotateCw = RotateCw;
  readonly UserRound = UserRound;
  readonly Star = Star;

  constructor(
    private _http: HttpClient,
    private postsService: PostService,
    private comentarioService: ComentarioService
  ) {
    addIcons({ heartOutline, heart, chevronDownOutline, star, starOutline });
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
      this.comentarioService.getAllComentarios(publicacao.idPublicacao, 0, this.comentarioSize).subscribe(
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
    this.comentarioService.getAllComentarios(publicacao.idPublicacao, nextPage, this.comentarioSize).subscribe(
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
  
}
