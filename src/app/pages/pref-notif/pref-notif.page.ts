import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonLabel,
  IonText
} from '@ionic/angular/standalone';

import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

@Component({
  selector: 'app-pref-notif',
  templateUrl: './pref-notif.page.html',
  styleUrls: ['./pref-notif.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonToggle,
    IonLabel,
    IonText
  ],
})
export class PrefNotifPage implements OnInit {
  pageTitle: string = 'Preferências';
  pageMenu: string = 'pref-notif';
  pageContent: string = 'pref-notif';
  constructor() {}

  ngOnInit() {}
}
