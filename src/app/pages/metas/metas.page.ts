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
  IonTextarea
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  BicepsFlexed,
  CaseUpper,
  ChevronDown,
  CircleX,
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
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { AlertController } from '@ionic/angular';
import { ModalEditarMetaDiariaComponent } from '../../components/modal-editar-meta-diaria/modal-editar-meta-diaria.component';

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
    LucideAngularModule,
    ModalEditarMetaDiariaComponent,
    IonTextarea
  ],
})
export class MetasPage implements OnInit {
  pageTitle: string = 'Metas';
  pageMenu: string = 'metas-menu';
  pageContent: string = 'metas';

  selectedSegment: string = 'criacao';
  filterEsportivas: boolean = false;
  filterDiarias: boolean = true;

  idAcademico: number = 1;
  metaDiaria: MetaDiaria[] = [];
  metaDiaria2: MetaDiaria = new MetaDiaria();

  modalEditarVisivel: boolean = false;
  metaParaEditar!: MetaDiaria;

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

  constructor(
    private metaDiariaService: MetaDiariaService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.listarMetaDiarias();
  }

  abrirModalEditar(meta: any) {
    this.metaParaEditar = meta;
    console.log(this.metaParaEditar);
    this.modalEditarVisivel = true;
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }

  listarMetaDiarias(): void {
    this.metaDiariaService
      .getMetaDiariaByAcademicoId(this.idAcademico)
      .subscribe({
        next: (data: MetaDiaria[] | null) => {
          if (data === null) {
            this.metaDiaria = [];
          } else {
            this.metaDiaria = data;
            console.log('Dados da meta diária:', this.metaDiaria);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar meta diária:', err);
        },
      });
  }

  salvarDados(): void {
    if (this.metaDiaria2) {
      this.metaDiaria2.idAcademico = this.idAcademico;

      console.log('MetaDiaria antes de salvar:', this.metaDiaria2);

      this.metaDiariaService.postMetaDiaria(this.metaDiaria2).subscribe({
        next: (data) => {
          console.log('Meta Diária criada com sucesso:', data);
        },
        error: (err) => {
          console.error('Erro ao criar Meta Diária:', err);
          console.log('MetaDiaria:', this.metaDiaria2);
        },
      });
    }
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
            this.excluirMetaConfirmada(meta.idMetaDiaria.toString()); // Chama a função de exclusão ao confirmar
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
        console.log('Meta excluída com sucesso:', result);
        this.listarMetaDiarias(); // Atualiza a lista de metas após exclusão
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

  metasDiarias: Meta[] = [
    {
      tipo: 'diaria',
      nome: 'Beber água',
      opcoes: ['1L', '2L', '3L'],
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
  ];

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
