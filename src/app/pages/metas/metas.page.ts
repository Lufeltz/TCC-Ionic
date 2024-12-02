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
  IonItem,
  IonToast,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonIcon,
  IonList,
  IonTextarea,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { AlertController } from '@ionic/angular';
import { ModalEditarMetaDiariaComponent } from '../../components/modal-editar-meta-diaria/modal-editar-meta-diaria.component';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { MetaEsportivaService } from 'src/app/services/meta-esportiva.service';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
import { forkJoin, Subscription } from 'rxjs';
import { Conquista } from 'src/app/models/conquista.model';
import { ConquistasService } from 'src/app/services/conquistas.service';

import {
  BicepsFlexed,
  CaseUpper,
  ChevronDown,
  CircleDashed,
  ClipboardPen,
  Clock4,
  EllipsisVertical,
  LucideAngularModule,
  NotebookText,
  Pencil,
  Ruler,
  SquareCheckBig,
  SquarePen,
  Target,
  Trash2,
} from 'lucide-angular';
import { ModalEditarMetaEsportivaComponent } from 'src/app/components/modal-editar-meta-esportiva/modal-editar-meta-esportiva.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonIcon,
    IonAccordion,
    IonAccordionGroup,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    IonButton,
    IonToast,
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
    ModalEditarMetaDiariaComponent,
    ModalEditarMetaEsportivaComponent,
    IonTextarea,
    LucideAngularModule,
  ],
})
export class MetasPage implements OnInit {
  constructor(
    private metaDiariaService: MetaDiariaService,
    private metaEsportivaService: MetaEsportivaService,
    private alertController: AlertController,
    private authService: AuthService,
    private conquistasService: ConquistasService,
    private stateService: StateService
  ) {}

  private modalidadeUpdateSubscription!: Subscription;

  pageTitle: string = 'Metas';
  pageMenu: string = 'metas-menu';
  pageContent: string = 'metas';

  selectedSegment: string = 'listagem';
  filterEsportivas: boolean = false;
  filterDiarias: boolean = true;

  user: Academico = new Academico();
  modalidadesUsuario: any[] = [];
  metasPorModalidade: MetaEsportiva[] = [];
  metasEsportivas: MetaEsportiva[] = [];

  metaDiaria: MetaDiaria[] = [];
  metaDiaria2: MetaDiaria = new MetaDiaria();

  modalEditarVisivel: boolean = false;
  metaParaEditar!: MetaDiaria;

  modalEsportivaEditarVisivel: boolean = false;
  ConquistaParaEditar!: Conquista;

  conquistasUsuario: Conquista[] = [];

  modalidades: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Vôlei',
    3: 'Basquete',
    4: 'Tênis de Mesa',
    5: 'Handebol',
  };

  readonly Clock4 = Clock4;
  readonly BicepsFlexed = BicepsFlexed;
  readonly Pencil = Pencil;
  readonly Target = Target;
  readonly Ruler = Ruler;
  readonly SquarePen = SquarePen;
  readonly SquareCheckBig = SquareCheckBig;
  readonly Trash2 = Trash2;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly ChevronDown = ChevronDown;
  readonly CircleDashed = CircleDashed;
  readonly ClipboardPen = ClipboardPen;
  readonly EllipsisVertical = EllipsisVertical;

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
      this.carregarDadosUsuario();

      this.stateService.updateModalidades$.subscribe(() => {
        this.carregarModalidades();
        this.carregarConquistas();
      });

      this.stateService.updateMetasDiarias$.subscribe(() => {
        this.listarMetaDiarias();
      });

      this.stateService.updateMetasEsportivas$.subscribe(() => {
        this.listarMetasEsportivas();
        this.carregarModalidades();
        this.carregarConquistas();
      });
    } else {
      console.error('Usuário não autenticado');
    }
  }

  getModalidadeName(id: number): string {
    return this.modalidades[id] || 'Desconhecido';
  }

  abrirModalEditar(meta: any) {
    this.metaParaEditar = meta;
    this.modalEditarVisivel = true;
  }

  abrirModalEditarEsportiva(conquista: any) {
    this.ConquistaParaEditar = conquista;
    this.modalEsportivaEditarVisivel = true;
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }

  fecharModalEsportiva() {
    this.modalEsportivaEditarVisivel = false;
  }

  listarMetasEsportivas(): void {
    if (this.modalidadesUsuario.length === 0) {
      console.error('O usuário não tem modalidades associadas.');
      return;
    }

    const observables = this.modalidadesUsuario.map((modalidade) =>
      this.metaEsportivaService.getMetasPorModalidade(modalidade.idModalidade)
    );

    forkJoin(observables).subscribe({
      next: (resultados) => {
        this.metasEsportivas = resultados
          .flat()
          .filter((meta): meta is MetaEsportiva => meta !== null);
      },
      error: (err) => {
        console.error('Erro ao buscar metas esportivas:', err);
      },
    });
  }

  listarMetaDiarias(): void {
    this.metaDiariaService
      .getMetaDiariaByAcademicoId(this.user.idAcademico)
      .subscribe({
        next: (data: MetaDiaria[] | null) => {
          if (data === null) {
            this.metaDiaria = [];
          } else {
            this.metaDiaria = data;
          }
        },
        error: (err) => {
          console.error('Erro ao buscar meta diária:', err);
        },
      });
  }

  menuVisibilityMetaDiaria: { [key: number]: boolean } = {};

  toggleMenuMetaDiaria(metaDiariaId: number): void {
    for (const id in this.menuVisibilityMetaDiaria) {
      if (Number(id) !== metaDiariaId) {
        this.menuVisibilityMetaDiaria[id] = false;
      }
    }

    this.menuVisibilityMetaDiaria[metaDiariaId] =
      !this.menuVisibilityMetaDiaria[metaDiariaId];
  }

  editarMetaDiaria(metaDiariaId: number, meta: MetaDiaria): void {
    this.abrirModalEditar(meta);

    this.menuVisibilityMetaDiaria[metaDiariaId] = false;
  }

  deletarMetaDiaria(metaDiariaId: number, meta: MetaDiaria): void {
    this.excluirMeta(meta);

    this.menuVisibilityMetaDiaria[metaDiariaId] = false;
  }

  menuVisibilityConquista: { [key: string]: boolean } = {};

  toggleMenuConquista(modalidadeId: number, conquistaId: number): void {
    Object.keys(this.menuVisibilityConquista).forEach((id) => {
      if (id !== 'conquista_' + modalidadeId + '_' + conquistaId) {
        this.menuVisibilityConquista[id] = false;
      }
    });

    this.menuVisibilityConquista[
      'conquista_' + modalidadeId + '_' + conquistaId
    ] =
      !this.menuVisibilityConquista[
        'conquista_' + modalidadeId + '_' + conquistaId
      ];
  }

  editarConquista(
    modalidadeId: number,
    conquistaId: number,
    conquista: Conquista
  ): void {
    this.abrirModalEditarEsportiva(conquista);

    this.menuVisibilityConquista[
      'conquista_' + modalidadeId + '_' + conquistaId
    ] = false;
  }

  private carregarDadosUsuario(): void {
    this.carregarModalidades();
    this.carregarConquistas();
    this.listarMetaDiarias();
  }

  private carregarModalidades(): void {
    this.metaEsportivaService
      .getModalidadesPorUsuario(this.user.idAcademico)
      .subscribe({
        next: (modalidades) => {
          this.modalidadesUsuario = modalidades;
          this.listarMetasEsportivas();
        },
        error: (err) => {
          console.error('Erro ao carregar modalidades:', err);
        },
      });
  }

  private carregarConquistas(): void {
    this.conquistasService
      .getConquistasByUserId(this.user.idAcademico)
      .subscribe({
        next: (conquistas) => {
          this.conquistasUsuario = conquistas || [];
        },
        error: (err) => {
          console.error('Erro ao carregar conquistas:', err);
        },
      });
  }

  get filteredMetasEsportivas(): Conquista[] {
    if (this.filterEsportivas) {
      return this.conquistasUsuario.filter(
        (conquista) =>
          conquista.metaEsportiva !== undefined &&
          conquista.conquistado === false
      );
    } else {
      return [];
    }
  }

  get filteredMetasDiarias(): MetaDiaria[] {
    if (this.filterDiarias) {
      return this.metaDiaria;
    } else {
      return [];
    }
  }

  toggleFilterEsportivas(event: any) {
    this.filterEsportivas = event.detail.checked;
  }

  toggleFilterDiarias(event: any) {
    this.filterDiarias = event.detail.checked;
  }

  salvarDados(): void {
    if (this.metaDiaria2) {
      this.metaDiaria2.idAcademico = this.user.idAcademico;

      this.metaDiariaService.postMetaDiaria(this.metaDiaria2).subscribe({
        next: (data) => {
          this.listarMetaDiarias();
          this.resetMetaDiariaForm();
        },
        error: (err) => {
          console.error('Erro ao criar Meta Diária:', err);
        },
      });
    }
  }

  resetMetaDiariaForm() {
    this.metaDiaria2 = new MetaDiaria();
  }

  verificarProgresso(meta: MetaDiaria) {
    if (
      meta.progressoMaximo != null &&
      meta.progressoAtual >= meta.progressoMaximo
    ) {
      this.excluirPresentAlert(meta);
    }
  }

  async excluirPresentAlert(meta: MetaDiaria) {
    const alert = await this.alertController.create({
      header: 'Conclusão de Meta',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Concluir',
          handler: () => {
            this.excluirMetaConfirmada(meta.idMetaDiaria.toString());
            this.stateService.triggerUpdateListarMetasDiarias();
          },
        },
      ],
    });

    await alert.present();

    const alertElement = document.querySelector('ion-alert') as HTMLElement;
    const messageElement = alertElement.querySelector('.alert-message');

    if (messageElement) {
      messageElement.innerHTML = `
        <strong>Título:</strong> ${meta.titulo} <br>
        <strong>Objetivo:</strong> ${meta.objetivo || 'Não definido'} <br>
        <strong>Progresso:</strong> ${meta.progressoAtual} / ${
        meta.progressoMaximo
      } ${meta.progressoItem} <br>
        <strong>Situação:</strong> ${
          meta.situacaoMetaDiaria === 0 ? 'Pendente' : 'Concluída'
        }
      `;
    }
  }

  excluirMetaConfirmada(id: string) {
    this.metaDiariaService.deleteMetaDiaria(id).subscribe({
      next: () => {
        this.listarMetaDiarias();
        this.stateService.triggerUpdateListarMetasDiarias();
      },
      error: (err) => {
        console.error('Erro ao excluir meta:', err);
      },
    });
  }

  async concluirPresentAlert(meta: MetaDiaria) {
    const alert = await this.alertController.create({
      header: 'Conclusão de meta',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Concluir',
          handler: () => {
            this.listarMetaDiarias();
            this.stateService.triggerUpdateListarMetasDiarias();
            console.log('Meta confirmada:', meta);
          },
        },
      ],
    });

    await alert.present();

    const alertElement = document.querySelector('ion-alert') as HTMLElement;
    const messageElement = alertElement.querySelector('.alert-message');

    if (messageElement) {
      messageElement.innerHTML = `
        <strong>Título:</strong> ${meta.titulo} <br>
        <strong>Objetivo:</strong> ${meta.objetivo || 'Não definido'} <br>
        <strong>Progresso:</strong> ${meta.progressoAtual} / ${
        meta.progressoMaximo
      } ${meta.progressoItem} <br>
        <strong>Situação:</strong> ${
          meta.situacaoMetaDiaria === 0 ? 'Pendente' : 'Concluída'
        }
      `;
    }
  }

  concluirMeta(meta: MetaDiaria) {
    this.concluirPresentAlert(meta);
  }

  excluirMeta(meta: MetaDiaria) {
    this.excluirPresentAlert(meta);
  }
}
