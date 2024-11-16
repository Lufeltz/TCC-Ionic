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
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { AlertController } from '@ionic/angular';
import { ModalEditarMetaDiariaComponent } from '../../components/modal-editar-meta-diaria/modal-editar-meta-diaria.component';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { MetaEsportivaService } from 'src/app/services/meta-esportiva.service';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
import { forkJoin } from 'rxjs';

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
    IonTextarea,
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
  modalidadesUsuario: any[] = []; // Variável para armazenar as modalidades
  metasPorModalidade: MetaEsportiva[] = [];
  metasEsportivas: MetaEsportiva[] = [];

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
  readonly CircleDashed = CircleDashed;
  readonly ClipboardPen = ClipboardPen;

  constructor(
    private metaDiariaService: MetaDiariaService,
    private metaEsportivaService: MetaEsportivaService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser(); // Obtém o usuário autenticado
    if (user) {
      this.user = user; // Armazena o usuário na variável user
      this.modalidadesUsuario = this.user.modalidades || []; // Atribui as modalidades ao usuário
      console.log('Modalidades do usuário:', this.modalidadesUsuario); // Log para conferir os dados
      this.listarMetaDiarias(); // Chama a função para listar as metas diárias
      this.listarMetasEsportivas(); // Chama a função para listar as metas esportivas
    } else {
      console.error('Usuário não autenticado');
    }
  }

  getModalidadeName(idModalidade: number): string | undefined {
    const modalidade = this.modalidadesUsuario.find(
      (m) => m.idModalidade === idModalidade
    );
    return modalidade ? modalidade.nomeModalidade : undefined;
  }

  // Métodos de filtro separados para metas diárias
  get filteredMetasDiarias(): MetaDiaria[] {
    if (this.filterDiarias) {
      return this.metaDiaria; // Exibe apenas as metas diárias
    } else {
      return []; // Não exibe as metas diárias quando o filtro está desativado
    }
  }

  // Métodos de filtro separados para metas esportivas
  get filteredMetasEsportivas(): MetaEsportiva[] {
    if (this.filterEsportivas) {
      return this.metasEsportivas; // Exibe apenas as metas esportivas
    } else {
      return []; // Não exibe as metas esportivas quando o filtro está desativado
    }
  }

  // Lógica para alternar o filtro de metas esportivas
  toggleFilterEsportivas(event: any) {
    this.filterEsportivas = event.detail.checked;
  }

  // Lógica para alternar o filtro de metas diárias
  toggleFilterDiarias(event: any) {
    this.filterDiarias = event.detail.checked;
  }

  listarMetasEsportivas(): void {
    // Cria uma lista de observables para todas as modalidades do usuário
    const observables = this.modalidadesUsuario.map((modalidade) =>
      this.metaEsportivaService.getMetasPorModalidade(modalidade.idModalidade)
    );

    // Usa forkJoin para aguardar todas as requisições
    forkJoin(observables).subscribe({
      next: (resultados) => {
        // Combina todos os resultados em um único array, filtrando os valores nulos
        this.metasEsportivas = resultados
          .flat()
          .filter((meta): meta is MetaEsportiva => meta !== null);
        console.log('Todas as metas esportivas:', this.metasEsportivas);
      },
      error: (err) => {
        console.error('Erro ao buscar metas esportivas:', err);
      },
    });
  }

  listarMetaDiarias(): void {
    this.metaDiariaService
      .getMetaDiariaByAcademicoId(this.user.idAcademico) // Usando this.user.idAcademico
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

  // mostrarMetasPorModalidade(idModalidade: number): void {
  //   this.metaEsportivaService.getMetasPorModalidade(idModalidade).subscribe({
  //     next: (metas) => {
  //       console.log('Metas para a modalidade:', metas);
  //       // Aqui você pode tratar as metas retornadas, talvez armazenando em uma variável
  //     },
  //     error: (err) => {
  //       console.error('Erro ao buscar metas para a modalidade:', err);
  //     },
  //   });
  // }

  abrirModalEditar(meta: any) {
    this.metaParaEditar = meta;
    console.log(this.metaParaEditar);
    this.modalEditarVisivel = true;
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }

  salvarDados(): void {
    if (this.metaDiaria2) {
      this.metaDiaria2.idAcademico = this.user.idAcademico; // Usando this.user.idAcademico

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

  get filteredMetas(): (MetaDiaria | MetaEsportiva)[] {
    // Filtra as metas esportivas e diárias conforme o filtro
    if (this.filterEsportivas && !this.filterDiarias) {
      return this.metasEsportivas;
    } else if (!this.filterEsportivas && this.filterDiarias) {
      return this.metaDiaria;
    } else {
      return [...this.metaDiaria, ...this.metasEsportivas];
    }
  }
}
