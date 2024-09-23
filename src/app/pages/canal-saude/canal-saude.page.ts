import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

@Component({
  selector: 'app-canal-saude',
  templateUrl: './canal-saude.page.html',
  styleUrls: ['./canal-saude.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent
  ],
})
export class CanalSaudePage implements OnInit {
  pageTitle: string = 'Canal Saúde';
  pageMenu: string = 'canal-saude-menu';
  pageContent: string = 'canal-saude';

  constructor() {}

  ngOnInit() {}
}
