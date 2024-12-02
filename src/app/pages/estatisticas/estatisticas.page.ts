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
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

import { ConquistasComponent } from '../../components/conquistas/conquistas.component';
import { EstatisticasPessoaisComponent } from '../../components/estatisticas-pessoais/estatisticas-pessoais.component';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.page.html',
  styleUrls: ['./estatisticas.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    ConquistasComponent,
    EstatisticasPessoaisComponent,
  ],
})
export class EstatisticasPage implements OnInit {
  constructor() {}

  pageTitle: string = 'Estatísticas';
  pageMenu: string = 'estatisticas';
  pageContent: string = 'estatisticas';

  selectedSegment: string = 'estatisticas-pessoais';

  ngOnInit() {}
}
