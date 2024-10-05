import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonSearchbar,
  IonToggle,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JogadorComponent } from 'src/app/components/jogador/jogador.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [
    MenuPerfilComponent,
    JogadorComponent,
    PostsComponent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonContent,
    FormsModule,
    CommonModule,
    IonSearchbar,
    IonToggle,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
  ],
})
export class FeedPage implements OnInit {
  pageTitle: string = 'Comunidade';
  pageMenu: string = 'feed-menu';
  pageContent: string = 'feed';

  results: string = ""

  selectedSegment: string = 'campeonatos';

  constructor(private router: Router) {}

  ngOnInit() {}

  criarPost() {
    this.router.navigate(['/app-post']);
  }

  // search
  // usar em conjunto com o debounce no ion-searchbar
  // handleInput(event) {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  // }
}
