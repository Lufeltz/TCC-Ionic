import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonButton,
  IonToast,
  IonList,
  IonItem,
  IonText,
  IonTextarea,
  IonLabel,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { Router } from '@angular/router';
import { PublicacaoService } from '../../services/publicacao.service';
import { Publicacao } from '../../models/publicacao.model';
import { Academico } from 'src/app/models/academico.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  ArrowRight,
  LucideAngularModule,
  MessageCircleQuestion,
  NotebookPen,
} from 'lucide-angular';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
    LucideAngularModule,
  ],
})
export class PostPage implements OnInit {
  constructor(
    private router: Router,
    private publicacaoService: PublicacaoService,
    private authService: AuthService,
    private stateService: StateService
  ) {}

  pageTitle: string = 'Criar Publicação';
  pageMenu: string = 'criar-post';
  pageContent: string = 'criar-post';

  publicacao: Publicacao = new Publicacao();
  usuarioLogado: Academico | null = null;

  showToast: boolean = false;
  toastMessage: string = '';

  readonly ArrowRight = ArrowRight;
  readonly NotebookPen = NotebookPen;
  readonly MessageCircleQuestion = MessageCircleQuestion;

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
        console.log('Resposta do servidor:', response);
        if (response) {
          this.toastMessage = 'Post criado com sucesso!';
          this.showToast = true;
          this.stateService.triggerUpdateListagemPublicacoes();
          this.voltarComunidadePostCriado();
        } else {
          this.toastMessage = 'Erro ao criar o post. Tente novamente.';
          this.showToast = true;
        }
      },
      (error) => {
        console.error('Erro ao enviar o post:', error);
        this.toastMessage = 'Erro ao enviar o post. Tente novamente.';
        this.showToast = true;
      }
    );
  }

  voltarComunidadePostCriado() {
    setTimeout(() => {
      this.router.navigate(['/homepage/feed']);
    }, 2000);
  }

  voltarComunidadeSemCriarPost() {
    this.router.navigate(['/feed']);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }
}
