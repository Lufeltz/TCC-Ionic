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
  AlertButton,
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
  SquarePen,
  Users,
  Zap,
  ZapOff,
} from 'lucide-angular';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConquistasService } from 'src/app/services/conquistas.service';
import { Conquista } from 'src/app/models/conquista.model';

import { StateService } from 'src/app/services/state.service';
import { Academico } from 'src/app/models/academico.model';

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
  constructor(
    private modalidadesService: ModalidadesService,
    private authService: AuthService,
    private conquistaService: ConquistasService,
    private stateService: StateService
  ) {}

  pageTitle: string = 'Modalidades';
  pageMenu: string = 'modalidades-menu';
  pageContent: string = 'modalidades';

  selectedSegment: string = 'inscrito';

  todasModalidades: any;
  modalidadesInscritas: any;
  modalidadesDiferentes: any;
  conquistasUsuario: Conquista[] | null = [];

  alertButtons: AlertButton[] = [];

  modalEditarVisivel: boolean = false;
  modalidadeParaEditar!: any;

  user: Academico | null = null;

  isBlocked: boolean = false;
  mensagemAusencia: string =
    'Você ainda não se inscreveu em nenhuma modalidade.';

  contagemPorModalidade: {
    [key: number]: { conquistados: number; naoConquistados: number };
  } = {};

  modalidades: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Vôlei',
    3: 'Basquete',
    4: 'Tênis de Mesa',
    5: 'Handebol',
  };

  readonly SquareArrowUpRight = SquareArrowUpRight;
  readonly CircleX = CircleX;
  readonly Medal = Medal;
  readonly ExternalLink = ExternalLink;
  readonly Notebook = Notebook;
  readonly Zap = Zap;
  readonly ZapOff = ZapOff;
  readonly Crosshair = Crosshair;
  readonly Users = Users;
  readonly SquarePen = SquarePen;

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) {
      const usuarioId = this.user.idAcademico;
      this.carregarModalidadesConquistas(usuarioId);
    } else {
      console.error('Usuário não autenticado');
    }
  }

  processarConquistas(): void {
    this.conquistasUsuario!.forEach((conquista) => {
      const modalidade = conquista.metaEsportiva.idModalidadeEsportiva;
      const conquistado = conquista.conquistado;

      if (!this.contagemPorModalidade[modalidade]) {
        this.contagemPorModalidade[modalidade] = {
          conquistados: 0,
          naoConquistados: 0,
        };
      }

      if (conquistado) {
        this.contagemPorModalidade[modalidade].conquistados++;
      } else {
        this.contagemPorModalidade[modalidade].naoConquistados++;
      }
    });
  }

  setSelectedSegment(segment: string) {
    this.selectedSegment = segment;

    if (segment === 'inscrito') {
      this.modalidadesInscritas = this.modalidadesInscritas || [];
    } else if (segment === 'nao-inscrito') {
      this.modalidadesDiferentes = this.modalidadesDiferentes || [];
    }
  }

  carregarModalidadesConquistas(usuarioId: number) {
    forkJoin({
      modalidadesInscritas:
        this.modalidadesService.getModalidadesInscritas(usuarioId),
      todasModalidades: this.modalidadesService.getAllModalidades(),
      conquistas: this.conquistaService.getConquistasByUserId(usuarioId),
    }).subscribe({
      next: (result) => {
        this.modalidadesInscritas = result.modalidadesInscritas || [];
        this.todasModalidades = result.todasModalidades;
        this.conquistasUsuario = result.conquistas;
        this.processarConquistas();

        this.modalidadesDiferentes = this.compararModalidades(
          this.modalidadesInscritas,
          this.todasModalidades
        );
      },
      error: (err) => {
        if (err.status === 404) {
          console.warn('Nenhuma modalidade ou conquista encontrada.');
          this.modalidadesInscritas = [];
          this.todasModalidades = [];
          this.modalidadesDiferentes = [];
        } else {
          console.error('Erro ao carregar modalidades ou conquistas:', err);
        }
      },
    });
  }
  compararModalidades(inscritas: any[], todas: any[]): any[] {
    if (!inscritas || !todas) {
      return [];
    }

    const inscritasIds = inscritas.map((mod) => mod.idModalidadeEsportiva);
    const todasIds = todas.map((mod) => mod.idModalidadeEsportiva);

    const modalidadesDiferentes = todas.filter(
      (mod) => !inscritasIds.includes(mod.idModalidadeEsportiva)
    );

    return modalidadesDiferentes;
  }

  inscreverModalidade(modalidadeId: number) {
    const user = this.authService.getUser();
    if (user) {
      const usuarioId = user.idAcademico;

      this.modalidadesService
        .inscreverModalidade(usuarioId, modalidadeId)
        .subscribe({
          next: (resp) => {
            this.stateService.triggerUpdateListagemModalidades();
            this.stateService.triggerUpdateListagemCampeonatos();
          },
          error: (err) => {
            console.error('Erro ao realizar inscrição:', err);
          },
        });
    }
  }

  removerInscricaoModalidade(modalidadeId: number) {
    const user = this.authService.getUser();
    if (user) {
      const usuarioId = user.idAcademico;

      this.modalidadesService
        .removerModalidade(usuarioId, modalidadeId)
        .subscribe({
          next: (resp) => {
            this.stateService.triggerUpdateListagemModalidades();
            this.stateService.triggerUpdateListagemCampeonatos();
          },
          error: (err) => {
            console.error('Erro ao cancelar inscrição:', err);
          },
        });
    }
  }

  setResult(event: any) {
    if (event.detail.role === 'confirm') {
    } else {
      console.log('Realizada a inscrição');
      if (this.user) {
        this.carregarModalidadesConquistas(this.user.idAcademico);
      }
    }
  }

  getAlertButtons(modalidadeId: number): AlertButton[] {
    return [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Inscrição cancelada');
        },
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.inscreverModalidade(modalidadeId);
        },
      },
    ];
  }

  getCancelAlertButtons(modalidadeId: number): AlertButton[] {
    return [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelamento de inscrição abortado');
        },
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.removerInscricaoModalidade(modalidadeId);
        },
      },
    ];
  }

  abrirModalEditar(meta: any) {
    this.modalidadeParaEditar = meta;
    this.modalEditarVisivel = true;
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }
}
