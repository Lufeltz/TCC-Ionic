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
  IonLabel,
} from '@ionic/angular/standalone';

import {
  House,
  Volleyball,
  LucideAngularModule,
  Trophy,
  Zap,
} from 'lucide-angular';

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
    IonLabel,
    LucideAngularModule,
  ],
})
export class HomepagePage implements OnInit {
  constructor() {}
  selectedTab: string = '';

  // Lucide icons
  readonly House = House;
  readonly Volleyball = Volleyball;
  readonly Trophy = Trophy;
  readonly Zap = Zap;

  onTabChange(event: any) {
    this.selectedTab = event.tab;
  }

  ngOnInit() {}
}
