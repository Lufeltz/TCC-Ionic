import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonToggle,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonAlert,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  CircleX,
  Crosshair,
  ExternalLink,
  LucideAngularModule,
  Medal,
  Notebook,
  SquareArrowUpRight,
  SquareX,
  Users,
  X,
  Zap,
  ZapOff,
} from 'lucide-angular';

interface Modalidade {
  nome: string;
  descricao: string;
  foto: string | null;
  dataCriacao: string;
  inscrito: boolean;
}

@Component({
  selector: 'app-modalidades',
  templateUrl: './modalidades.page.html',
  styleUrls: ['./modalidades.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonLabel,
    IonToggle,
    IonSegment,
    IonSegmentButton,
    IonButton,
    IonAlert,
    LucideAngularModule,
  ],
})
export class ModalidadesPage implements OnInit {
  pageTitle: string = 'Modalidades';
  pageMenu: string = 'modalidades-menu';
  pageContent: string = 'modalidades';

  selectedSegment: string = 'inscrito';
  modalidades: Modalidade[] = [];
  currentModalidade: Modalidade | null = null; // Para armazenar a modalidade atual

  readonly SquareArrowUpRight = SquareArrowUpRight;
  readonly CircleX = CircleX;
  readonly Medal = Medal;
  readonly ExternalLink = ExternalLink;
  readonly Notebook = Notebook;
  readonly Zap = Zap;
  readonly ZapOff = ZapOff;
  readonly Crosshair = Crosshair;
  readonly Users = Users;

  constructor() {}

  public alertButtons = [
    {
      text: 'Voltar',
      role: 'voltar',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Confirmar',
      role: 'confirmar',
      handler: () => {
        if (this.currentModalidade) {
          // Aqui você altera a lógica dependendo do estado atual
          this.currentModalidade.inscrito = !this.currentModalidade.inscrito;
          const action = this.currentModalidade.inscrito
            ? 'inscrito'
            : 'cancelado';
          console.log(
            `Modalidade ${this.currentModalidade.nome} agora está ${action}: ${this.currentModalidade.inscrito}`
          );
        }
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  ngOnInit() {
    this.modalidades = [
      {
        nome: 'Futebol',
        descricao:
          'Esporte jogado por dois times, onde o objetivo é marcar gols movendo a bola com os pés. Vence quem marcar mais gols em dois tempos de partida.',
        foto: null,
        dataCriacao: '2024-10-09T17:38:29Z',
        inscrito: true,
      },
      {
        nome: 'Vôlei',
        descricao:
          'Dois times tentam fazer a bola tocar o chão do lado adversário, passando-a por cima de uma rede. Vence quem ganhar 3 sets.',
        foto: null,
        dataCriacao: '2024-10-09T17:38:29Z',
        inscrito: false,
      },
      {
        nome: 'Basquete',
        descricao:
          'Dois times tentam marcar pontos arremessando a bola na cesta do adversário. Ganha quem fizer mais pontos em quatro períodos.',
        foto: null,
        dataCriacao: '2024-10-09T17:38:29Z',
        inscrito: true,
      },
      {
        nome: 'Tênis de Mesa',
        descricao:
          'Jogadores usam raquetes para golpear uma bola em uma mesa com rede. O objetivo é fazer o adversário errar a devolução. Vence quem ganhar mais sets.',
        foto: null,
        dataCriacao: '2024-10-09T17:38:29Z',
        inscrito: false,
      },
    ];
  }

  getModalidadesInscritas() {
    return this.modalidades.filter((modalidade) => modalidade.inscrito);
  }

  getModalidadesNaoInscritas() {
    return this.modalidades.filter((modalidade) => !modalidade.inscrito);
  }

  setCurrentModalidade(modalidade: Modalidade) {
    this.currentModalidade = modalidade;
  }
}
