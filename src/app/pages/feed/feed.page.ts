import { Component, OnInit } from '@angular/core';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonSearchbar,
  IonToggle,
  IonButton
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
    CommonModule,
    IonSearchbar,
    IonToggle,
    IonButton
  ],
})
export class FeedPage implements OnInit {
  pageTitle: string = 'Feed';
  pageMenu: string = 'feed-menu';
  pageContent: string = 'feed';

  selectedSegment: string = 'campeonatos';
  constructor() {}

  ngOnInit() {}


  // search
  // usar em conjunto com o debounce no ion-searchbar
  // handleInput(event) {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  // }
}
