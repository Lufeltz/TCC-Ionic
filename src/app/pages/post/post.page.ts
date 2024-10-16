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
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonInput,
    IonToast,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
  ],
})
export class PostPage implements OnInit {
  pageTitle: string = 'Criar Post';
  pageMenu: string = 'criar-post';
  pageContent: string = 'criar-post';

  constructor(private router: Router) {}

  ngOnInit() {}

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
