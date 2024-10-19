import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { JogadorComponent } from 'src/app/components/jogador/jogador.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { ListagemCampeonatosComponent } from 'src/app/components/listagem-campeonatos/listagem-campeonatos.component';
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
    ListagemCampeonatosComponent,
  ],
})
export class FeedPage implements OnInit {
  pageTitle: string = 'Comunidade';
  pageMenu: string = 'feed-menu';
  pageContent: string = 'feed';

  searchTerm: string = '';
  selectedSegment: string = 'campeonatos';

  statusToggles: { aberto: boolean; finalizado: boolean; iniciado: boolean } = {
    aberto: true,
    finalizado: false,
    iniciado: false,
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  criarPost() {
    this.router.navigate(['/app-post']);
  }

  updateStatus(status: 'aberto' | 'finalizado' | 'iniciado', event: any) {
    this.statusToggles = {
      ...this.statusToggles,
      [status]: event.detail.checked,
    };
  }
}
