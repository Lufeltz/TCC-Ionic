import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonToast,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { InformacoesSaudeComponent } from '../../components/informacoes-saude/informacoes-saude.component';

@Component({
  selector: 'app-canal-saude',
  templateUrl: './canal-saude.page.html',
  styleUrls: ['./canal-saude.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    InformacoesSaudeComponent,
  ],
})
export class CanalSaudePage implements OnInit {
  constructor() {}

  pageTitle: string = 'Canal Saúde';
  pageMenu: string = 'canal-saude';
  pageContent: string = 'canal-saude';

  ngOnInit() {}
}
