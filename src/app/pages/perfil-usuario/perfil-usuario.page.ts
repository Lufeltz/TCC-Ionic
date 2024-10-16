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
import { EstatisticasEsportivasComponent } from "../../components/estatisticas-esportivas/estatisticas-esportivas.component";
import { ConquistasComponent } from "../../components/conquistas/conquistas.component";
import { EstatisticasPessoaisComponent } from "../../components/estatisticas-pessoais/estatisticas-pessoais.component";

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
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
    EstatisticasEsportivasComponent,
    ConquistasComponent,
    EstatisticasPessoaisComponent
],
})
export class PerfilUsuarioPage implements OnInit {
  pageTitle: string = 'Estatísticas';
  pageMenu: string = 'estatisticas';
  pageContent: string = 'estatisticas';
  
  selectedSegment: string = 'estatisticas-pessoais';
  constructor() {}

  ngOnInit() {}
}
