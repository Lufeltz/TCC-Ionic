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
  IonToggle,
  IonItem, IonToast, IonButton, IonInput } from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

interface Meta {
  tipo: 'diaria' | 'esportiva';
  nome?: string;
  esporte?: string;
  opcoes?: string[];
  metas?: string[];
}

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonToast, 
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonSegmentButton,
    IonLabel,
    IonSegment,
    IonToggle,
  ],
})
export class MetasPage implements OnInit {
  pageTitle: string = 'Metas';
  pageMenu: string = 'metas-menu';
  pageContent: string = 'metas';

  selectedSegment: string = 'criacao';
  filterEsportivas: boolean = false;
  filterDiarias: boolean = false;

  metasDiarias: Meta[] = [
    { tipo: 'diaria', nome: 'Beber água', opcoes: ['1L', '2L', '3L'] },
    {
      tipo: 'diaria',
      nome: 'Comer uma fruta',
      opcoes: ['1 fruta', '2 frutas'],
    },
    {
      tipo: 'diaria',
      nome: 'Ler páginas de um livro',
      opcoes: ['5 páginas', '7 páginas', '10 páginas'],
    },
    {
      tipo: 'diaria',
      nome: 'Dar uma quantidade específica de passos',
      opcoes: ['50 passos', '200 passos', '500 passos'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer polichinelos',
      opcoes: ['15 polichinelos', '30 polichinelos', '45 polichinelos'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer flexões',
      opcoes: ['5 flexões', '8 flexões', '12 flexões'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer abdominais',
      opcoes: ['10 abdominais', '20 abdominais', '30 abdominais'],
    },
  ];

  metasEsportivas: Meta[] = [
    {
      tipo: 'esportiva',
      esporte: 'Futebol',
      metas: [
        'Gols feitos',
        'Assistências feitas',
        'Defesas feitas',
        'Gols de pênalti',
        'Conquistas obtidas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Tênis de mesa',
      metas: [
        'Pontos feitos',
        'Pontos no saque',
        'Vitórias',
        'Jogos sem levar pontos',
        'Conquistas obtidas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Vôlei',
      metas: [
        'Cortes feitos',
        'Bloqueios',
        'Saques realizados',
        'Levantamentos',
        'Conquistas obtidas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Basquete',
      metas: [
        'Cestas de dois pontos',
        'Cestas de três pontos',
        'Saques realizados',
        'Levantamentos',
        'Conquistas obtidas',
      ],
    },
  ];

  novaMeta: { titulo: string; descricao: string } = {
    titulo: '',
    descricao: '',
  };

  salvarMeta() {
    // Lógica para salvar a nova meta
    console.log('Meta salva:', this.novaMeta);
    this.novaMeta = { titulo: '', descricao: '' }; // Limpar campos após salvar
  }

  constructor() {}

  ngOnInit() {}

  toggleFilterEsportivas(event: any) {
    if (event.detail.checked) {
      this.filterEsportivas = true;
      this.filterDiarias = false;
    } else {
      this.filterEsportivas = false;
    }
  }

  toggleFilterDiarias(event: any) {
    if (event.detail.checked) {
      this.filterDiarias = true;
      this.filterEsportivas = false;
    } else {
      this.filterDiarias = false;
    }
  }

  get filteredMetas(): Meta[] {
    if (this.filterEsportivas && !this.filterDiarias) {
      return this.metasEsportivas;
    } else if (!this.filterEsportivas && this.filterDiarias) {
      return this.metasDiarias;
    } else {
      return [...this.metasDiarias, ...this.metasEsportivas];
    }
  }
}
