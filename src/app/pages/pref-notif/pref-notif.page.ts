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
  IonText,
  IonToast,
} from '@ionic/angular/standalone';

import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { EyeOff, LucideAngularModule, Volleyball } from 'lucide-angular';

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
    IonText,
    IonToast,
    LucideAngularModule
  ],
})
export class PrefNotifPage implements OnInit {
  pageTitle: string = 'Preferências';
  pageMenu: string = 'pref-notif';
  pageContent: string = 'pref-notif';

  readonly Volleyball = Volleyball;
  readonly EyeOff = EyeOff;

  estados = {
    modalidades: {
      notifCampeonatos: false,
      notifPosts: false,
      notifComentarios: false,
      notifLikes: false,
    },
    privacidade: {
      privModalidadesEsportivas: false,
      privHistoricoCampeonatos: false,
      privEstatisticasModalidades: false,
      privConquistas: false,
    },
  };

  constructor() {}

  mostrarEstadoToggle(estado: boolean): void {
    console.log(!estado);
  }

  ngOnInit() {}
}
