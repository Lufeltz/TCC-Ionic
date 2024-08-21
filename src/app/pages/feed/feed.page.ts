import { Component, OnInit } from '@angular/core';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [
    MenuPerfilComponent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonContent,
    FormsModule,
    CommonModule
  ],
})
export class FeedPage implements OnInit {
  pageTitle: string = 'Feed';
  pageMenu: string = 'feed-menu';
  pageContent: string = 'feed';

  selectedSegment: string = 'campeonatos';
  constructor() {}

  ngOnInit() {}
}
