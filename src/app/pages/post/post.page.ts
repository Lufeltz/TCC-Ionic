import { Component, OnInit } from '@angular/core';
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
import { PublicacaoService } from '../../services/publicacao.service'; // Import the service
import { Publicacao } from '../../models/publicacao.model'; // Import the model

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

  publicacao: Publicacao = new Publicacao(); // Initialize the publication model

  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private router: Router,
    private publicacaoService: PublicacaoService
  ) {} // Inject the service

  ngOnInit() {
    this.publicacao.Usuario.idUsuario = 9;
    this.publicacao.Usuario.username = 'car';
    this.publicacao.Usuario.permissao = 'ACADEMICO';
  }

  // Handle form submission
  onSubmit() {
    // Log the publication data to console

    this.publicacaoService.postPublicacao(this.publicacao).subscribe(
      (response) => {
        if (response) {
          // Success: navigate after a successful post
          this.toastMessage = 'Post criado com sucesso!';
          this.showToast = true;
          this.voltarComunidadePostCriado();
        } else {
          // Failure: show error message
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
    this.publicacao.idModalidadeEsportiva = null; // Atualiza corretamente
  }

  voltarComunidadePostCriado() {
    setTimeout(() => {
      this.router.navigate(['/feed']);
    }, 3000);
  }

  voltarComunidadeSemCriarPost() {
    this.router.navigate(['/feed']);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }
}
