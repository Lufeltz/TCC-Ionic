import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonButtons,
  IonModal,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

import { EstatisticasEsportivasComponent } from '../../components/estatisticas-esportivas/estatisticas-esportivas.component';
import { EstatisticasPessoaisComponent } from '../../components/estatisticas-pessoais/estatisticas-pessoais.component';
import { HistoricoCampeonatosComponent } from '../../components/historico-campeonatos/historico-campeonatos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-outro-usuario',
  templateUrl: './perfil-outro-usuario.page.html',
  styleUrls: ['./perfil-outro-usuario.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    MenuPerfilComponent,
    IonButton,
    IonButtons,
    IonModal,
    EstatisticasEsportivasComponent,
    EstatisticasPessoaisComponent,
    HistoricoCampeonatosComponent,
  ],
})
export class PerfilOutroUsuarioPage implements OnInit {
  pageTitle: string = 'Carlos Ribeiro';
  pageMenu: string = 'perfil-outro-usuario';
  pageContent: string = 'perfil-outro-usuario';

  selectedSegment: string = 'estatisticas';

  constructor(private router: Router) {}

  ngOnInit() {}

  avaliarJogador() {
    this.router.navigate(['/homepage/avaliar-jogador']);
  }
}
