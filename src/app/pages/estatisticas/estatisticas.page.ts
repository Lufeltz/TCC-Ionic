import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { EstatisticasPessoaisComponent } from '../../components/estatisticas-pessoais/estatisticas-pessoais.component';
import { ConquistasComponent } from '../../components/conquistas/conquistas.component';
import { EstatisticasEsportivasComponent } from '../../components/estatisticas-esportivas/estatisticas-esportivas.component';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.page.html',
  styleUrls: ['./estatisticas.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButton,
    IonLabel,
    IonSegmentButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
  ],
})
export class EstatisticasPage implements OnInit {
  pageTitle: string = 'Perfil Usuário';
  pageMenu: string = 'perfil-usuario';
  pageContent: string = 'perfil-usuario';

  usuario = {
    nome: 'Carlos Ribeiro',
    idade: 30,
    peso: 70,
    altura: 1.75,
    curso: "Análise e Desenvolvimento de Sistemas"
  };

  salvarDados() {
    // Lógica para salvar os dados do usuário
    console.log('Dados do usuário salvos:', this.usuario);
    // Aqui você pode chamar um serviço para enviar os dados para um backend
  }

  constructor() {}

  ngOnInit() {}
}
