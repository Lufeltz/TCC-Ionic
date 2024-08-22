import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuPerfilComponent]
})
export class PerfilUsuarioPage implements OnInit {
  pageTitle: string = 'Perfil Usuário';
  pageMenu: string = 'perfil-usuario';
  pageContent: string = 'perfil-usuario';
  constructor() { }

  ngOnInit() {
  }

}
