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
  IonToggle
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { HistoricoCampeonatosComponent } from "../../components/historico-campeonatos/historico-campeonatos.component";

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.page.html',
  styleUrls: ['./campeonatos.page.scss'],
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
    IonToggle,
    HistoricoCampeonatosComponent
],
})
export class CampeonatosPage implements OnInit {
  pageTitle: string = 'Campeonatos';
  pageMenu: string = 'campeonato-menu';
  pageContent: string = 'campeonato';

  selectedSegment: string = 'criacao';
  constructor() {}

  ngOnInit() {}
}
