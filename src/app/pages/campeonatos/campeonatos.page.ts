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
  IonToast,
  IonInput,
  IonDatetime,
  IonIcon,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { HistoricoCampeonatosComponent } from '../../components/historico-campeonatos/historico-campeonatos.component';
import { ListagemCampeonatosComponent } from '../../components/listagem-campeonatos/listagem-campeonatos.component';
import { calendar } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LucideAngularModule, Pencil } from 'lucide-angular';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.page.html',
  styleUrls: ['./campeonatos.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonDatetime,
    IonInput,
    IonToast,
    IonButton,
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
    HistoricoCampeonatosComponent,
    ListagemCampeonatosComponent,
    LucideAngularModule
  ],
})
export class CampeonatosPage implements OnInit {
  pageTitle: string = 'Campeonatos';
  pageMenu: string = 'campeonato-menu';
  pageContent: string = 'campeonato';

  selectedSegment: string = 'criacao';

  campeonato = {
    titulo: '',
    aposta: '',
    limiteParticipantes: '',
    descricao: '',
    inicio: new Date().toISOString(), // Data e hora atual em formato ISO
    fim: new Date().toISOString(), // Data e hora atual em formato ISO
    logradouro: '',
    bairro: '',
    complemento: '',
    cidade: '',
    uf: '',
    cep: '',
  };

  showInicioPicker: boolean = false; // Para controlar o seletor de início
  showFimPicker: boolean = false; // Para controlar o seletor de fim

  readonly Pencil = Pencil;

  constructor() {
    addIcons({ calendar });
  }

  ngOnInit() {}

  salvarDados() {
    console.log('Dados do usuário salvos:', this.campeonato);
    // Aqui você pode chamar um serviço para enviar os dados para um backend
  }

  toggleInicioPicker() {
    this.showInicioPicker = !this.showInicioPicker;
  }

  toggleFimPicker() {
    this.showFimPicker = !this.showFimPicker;
  }

  onInicioChange(event: any) {
    this.campeonato.inicio = event.detail.value; // Atualiza com o valor da data e hora
    this.showInicioPicker = false; // Fecha o seletor
  }

  onFimChange(event: any) {
    this.campeonato.fim = event.detail.value; // Atualiza com o valor da data e hora
    this.showFimPicker = false; // Fecha o seletor
  }
}
