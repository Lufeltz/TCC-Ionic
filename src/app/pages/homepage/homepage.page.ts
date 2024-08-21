import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  trophyOutline,
  flashOutline,
  homeOutline,
  footballOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ],
})
export class HomepagePage implements OnInit {
  selectedTab: string = '';

  constructor() {
    addIcons({ trophyOutline, flashOutline, homeOutline, footballOutline });
  }

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }

  ngOnInit() {}
}
