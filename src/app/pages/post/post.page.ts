import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonToast,
  IonList,
  IonItem,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { Router } from '@angular/router';
import { PublicacaoService } from '../../services/publicacao.service';
import { Publicacao } from '../../models/publicacao.model';
import { Academico } from 'src/app/models/academico.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsComponent } from 'src/app/components/posts/posts.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonToast,
    IonList,
    IonItem,
    IonText,
  ],
})
export class PostPage implements OnInit {
  pageTitle: string = 'Criar Post';
  pageMenu: string = 'criar-post';
  pageContent: string = 'criar-post';

  publicacao: Publicacao = new Publicacao();
  usuarioLogado: Academico | null = null;

  showToast: boolean = false;
  toastMessage: string = '';

  @ViewChild(PostsComponent) postsComponent: PostsComponent | undefined;

  constructor(
    private router: Router,
    private publicacaoService: PublicacaoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();

    if (this.usuarioLogado) {
      this.publicacao.Usuario.idUsuario = this.usuarioLogado.idAcademico;
      this.publicacao.Usuario.username = this.usuarioLogado.username;
      this.publicacao.Usuario.permissao = this.usuarioLogado.permissao;
    }
  }

  onSubmit() {
    this.publicacaoService.postPublicacao(this.publicacao).subscribe(
      (response) => {
        if (response) {
          this.toastMessage = 'Post criado com sucesso!';
          this.showToast = true;
          // Chama o método de adicionar post para atualizar a lista no componente PostsComponent
          // this.postsComponent?.adicionarPost(response);
          this.voltarComunidadePostCriado(); // Navega para a tela de feed após 3 segundos
        } else {
          this.toastMessage = 'Erro ao criar o post. Tente novamente.';
          this.showToast = true;
        }
      },
      (error) => {
        this.toastMessage = 'Erro ao enviar o post. Tente novamente.';
        this.showToast = true;
      }
    );
  }

  
  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.publicacao.idModalidadeEsportiva = null;
  }

  voltarComunidadePostCriado() {
    setTimeout(() => {
      this.router.navigate(['/feed']);
      this.postsComponent?.listarPosts()
    }, 3000);
  }

  voltarComunidadeSemCriarPost() {
    this.router.navigate(['/feed']);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }
}
