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
import { StateModalidadesService } from 'src/app/services/state-modalidades.service';
import {
  BicepsFlexed,
  CaseUpper,
  ChevronDown,
  CircleDashed,
  ClipboardPen,
  Clock4,
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
  pageTitle: string = 'Metas';
  pageMenu: string = 'metas-menu';
  pageContent: string = 'metas';

  selectedSegment: string = 'criacao';
  filterEsportivas: boolean = false;
  filterDiarias: boolean = true;

  user: Academico = new Academico();
  modalidadesUsuario: any[] = [];
  metasPorModalidade: MetaEsportiva[] = [];
  metasEsportivas: MetaEsportiva[] = [];

  metaDiaria: MetaDiaria[] = [];
  metaDiaria2: MetaDiaria = new MetaDiaria();

  // Modal meta diaria
  modalEditarVisivel: boolean = false;
  metaParaEditar!: MetaDiaria;

  // Modal meta esportiva
  modalEsportivaEditarVisivel: boolean = false;
  ConquistaParaEditar!: Conquista;

  conquistasUsuario: Conquista[] = [];

  private modalidadeUpdateSubscription!: Subscription;

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

  constructor(
    private metaDiariaService: MetaDiariaService,
    private metaEsportivaService: MetaEsportivaService,
    private alertController: AlertController,
    private authService: AuthService,
    private conquistasService: ConquistasService,
    private stateModalidadesService: StateModalidadesService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
      this.carregarDadosUsuario();

      this.modalidadeUpdateSubscription =
        this.stateModalidadesService.updateModalidades$.subscribe(() => {
          this.carregarModalidades();
          this.carregarConquistas();
        });
    } else {
      console.error('Usuário não autenticado');
    }
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
          console.log(this.modalidadesUsuario);
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
          console.log(this.conquistasUsuario);
        },
        error: (err) => {
          console.error('Erro ao carregar conquistas:', err);
        },
      });
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
        console.log(this.metasEsportivas);
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
          this.resetMetaDiariaForm(); // Adicione esta linha
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
      console.log(`dentro`);
    }
    console.log(`saiu`);
  }

  async excluirPresentAlert(meta: MetaDiaria) {
    const alert = await this.alertController.create({
      header: 'Exclusão de meta',
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
          text: 'Excluir',
          handler: () => {
            console.log('Meta confirmada:', meta);
            this.excluirMetaConfirmada(meta.idMetaDiaria.toString());
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
      next: (result) => {
        this.listarMetaDiarias();
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
