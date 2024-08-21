import { Component, OnInit } from '@angular/core';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';

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
  ],
})
export class FeedPage implements OnInit {
  pageTitle: string = 'Feed';
  pageMenu: string = 'feed-menu';
  pageContent: string = 'feed';
  constructor() {}

  ngOnInit() {}
}
