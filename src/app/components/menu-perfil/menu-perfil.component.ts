import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  schoolOutline,
  notificationsOutline,
  eyeOffOutline,
  settingsOutline,
  bicycleOutline,
  addCircleOutline,
  starOutline,
  calendarNumberOutline,
  logOutOutline,
  medkitOutline,
  analyticsOutline,
} from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonIcon,
    RouterModule,
  ],
})
export class MenuPerfilComponent implements OnInit {
  @Input() title: string = '';
  @Input() menu: string = '';
  @Input() menuContentId: string = '';
  constructor() {
    addIcons({
      personCircleOutline,
      schoolOutline,
      notificationsOutline,
      medkitOutline,
      settingsOutline,
      analyticsOutline,
      calendarNumberOutline,
      addCircleOutline,
      bicycleOutline,
      starOutline,
      logOutOutline,
      eyeOffOutline,
    });
  }

  ngOnInit() {}
}
