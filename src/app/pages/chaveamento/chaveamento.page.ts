import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';

@Component({
  selector: 'app-chaveamento',
  templateUrl: './chaveamento.page.html',
  styleUrls: ['./chaveamento.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
  ],
})
export class ChaveamentoPage implements OnInit {
  pageTitle: string = 'Chaveamento';
  pageMenu: string = 'chaveamento';
  pageContent: string = 'chaveamento';

  constructor() {}

  ngOnInit() {}
}
