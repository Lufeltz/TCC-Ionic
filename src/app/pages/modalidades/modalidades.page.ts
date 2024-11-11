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
import { ModalEditarModalidadeComponent } from 'src/app/components/modal-editar-modalidade/modal-editar-modalidade.component';

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
    ModalEditarModalidadeComponent
  ],
})
export class ModalidadesPage implements OnInit {
  pageTitle: string = 'Modalidades';
  pageMenu: string = 'modalidades-menu';
  pageContent: string = 'modalidades';

  selectedSegment: string = 'inscrito'; // Segmento selecionado: 'inscrito' ou 'gerais'

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

  // Variáveis para armazenar os resultados
  modalidadesInscritas: any;
  todasModalidades: any;
  modalidadesDiferentes: any; // Nova variável para armazenar as modalidades diferentes

  alertButtons: AlertButton[] = [];

  modalEditarVisivel: boolean = false;
  modalidadeParaEditar!: any;

  constructor(private modalidadesService: ModalidadesService) {}

  ngOnInit() {
    const usuarioId = 2; // Definindo o ID do usuário como 2

    // Usando forkJoin para chamar ambos os serviços
    forkJoin({
      modalidadesInscritas:
        this.modalidadesService.getModalidadesInscritas(usuarioId),
      todasModalidades: this.modalidadesService.getAllModalidades(),
    }).subscribe({
      next: (result) => {
        // Salvando os resultados separadamente nas variáveis
        this.modalidadesInscritas = result.modalidadesInscritas;
        this.todasModalidades = result.todasModalidades;

        // Comparar as duas variáveis e salvar os valores diferentes
        this.modalidadesDiferentes = this.compararModalidades(
          this.modalidadesInscritas,
          this.todasModalidades
        );

        // Imprimindo os resultados no console
        console.log('Modalidades Inscritas:', this.modalidadesInscritas);
        console.log('Todas as Modalidades:', this.todasModalidades);
        console.log('Modalidades Diferentes:', this.modalidadesDiferentes);
      },
      error: (err) => {
        console.error('Erro ao carregar modalidades:', err);
      },
    });

    this.alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Inscrição cancelada');
        },
      },
    ];
  }

  compararModalidades(inscritas: any[], todas: any[]): any[] {
    // Criando arrays apenas com os IDs de cada modalidade para facilitar a comparação
    const inscritasIds = inscritas.map((mod) => mod.idModalidadeEsportiva);
    const todasIds = todas.map((mod) => mod.idModalidadeEsportiva);

    // Encontrando as modalidades que estão em 'todas' mas não em 'inscritas'
    const modalidadesDiferentes = todas.filter(
      (mod) => !inscritasIds.includes(mod.idModalidadeEsportiva)
    );

    return modalidadesDiferentes;
  }

  inscreverModalidade(modalidadeId: number) {
    const usuarioId = 2; // Assumindo que o ID do usuário é 2, você pode substituir por uma variável dinâmica se necessário

    this.modalidadesService.inscreverModalidade(usuarioId, modalidadeId).subscribe({
      next: (resp) => {
        console.log('Inscrição realizada com sucesso:', resp);
        // Atualize a lista de modalidades inscritas após a inscrição
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erro ao realizar inscrição:', err);
      },
    });
  }

  removerInscricaoModalidade(modalidadeId: number) {
    const usuarioId = 2; // Assumindo que o ID do usuário é 2, você pode substituir por uma variável dinâmica se necessário

    this.modalidadesService.removerModalidade(usuarioId, modalidadeId).subscribe({
      next: (resp) => {
        console.log('Inscrição cancelada com sucesso:', resp);
        // Atualize a lista de modalidades inscritas após a inscrição
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erro ao cancelar inscrição:', err);
      },
    });
  }

  setResult(event: any) {
    if (event.detail.role === 'confirm') {
      console.log('Confirmação realizada');
    } else {
      console.log('Ação cancelada');
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
    console.log(this.modalidadeParaEditar);
    this.modalEditarVisivel = true;
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }
}
