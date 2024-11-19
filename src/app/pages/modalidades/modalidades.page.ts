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
import { AuthService } from 'src/app/services/auth.service';
import { StateModalidadesService } from 'src/app/services/state-modalidades.service';
import { ConquistasService } from 'src/app/services/conquistas.service';
import { Conquista } from 'src/app/models/conquista.model';

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
    ModalEditarModalidadeComponent,
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
  conquistasUsuario: Conquista[] | null = []; // Variável para armazenar as conquistas

  alertButtons: AlertButton[] = [];

  modalEditarVisivel: boolean = false;
  modalidadeParaEditar!: any;
  
  conquistasObtidas = {
    conquistado: 0,
    naoConquistado: 0,
  };

  contarConquistas() {
    // Objeto para armazenar as contagens

    // Verificando se 'conquistasUsuario' não é null ou indefinido
    if (this.conquistasUsuario) {
      // Iterando sobre as conquistas do usuário
      this.conquistasUsuario.forEach((conquista) => {
        // Incrementando as contagens conforme o valor de 'conquistado'
        if (conquista.conquistado === true) {
          // Garantindo comparação estrita com 'true'
          this.conquistasObtidas.conquistado++;
        } else {
          this.conquistasObtidas.naoConquistado++;
        }
      });
    }

    // Exibindo o objeto 'this.conquistasObtidas' no console
    console.log('obtidas', this.conquistasObtidas);
  }

  constructor(
    private modalidadesService: ModalidadesService,
    private authService: AuthService,
    private stateModalidadesService: StateModalidadesService,
    private conquistaService: ConquistasService // Serviço de conquistas
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      const usuarioId = user.idAcademico; // Obter o ID do usuário dinamicamente

      forkJoin({
        modalidadesInscritas:
          this.modalidadesService.getModalidadesInscritas(usuarioId),
        todasModalidades: this.modalidadesService.getAllModalidades(),
        conquistas: this.conquistaService.getConquistasByUserId(usuarioId), // Adiciona a requisição das conquistas
      }).subscribe({
        next: (result) => {
          this.modalidadesInscritas = result.modalidadesInscritas;
          this.todasModalidades = result.todasModalidades;
          this.conquistasUsuario = result.conquistas; // Armazena as conquistas
          this.contarConquistas();

          // Exibe as conquistas no console
          console.log('Conquistas do usuário:', this.conquistasUsuario);

          // Se não houver modalidades inscritas, as modalidades inscritas serão um array vazio
          if (!this.modalidadesInscritas) {
            this.modalidadesInscritas = [];
          }

          // Compara as modalidades inscritas com todas as modalidades
          this.modalidadesDiferentes = this.compararModalidades(
            this.modalidadesInscritas,
            this.todasModalidades
          );
        },
        error: (err) => {
          // Se um erro 404 for retornado (usuário não inscrito em nenhuma modalidade), carrega todas as modalidades
          if (err.status === 404) {
            this.modalidadesInscritas = []; // Nenhuma modalidade inscrita
            this.todasModalidades = err.error || []; // Lista todas as modalidades disponíveis
            this.modalidadesDiferentes = this.todasModalidades; // Mostrar todas as modalidades no caso de erro
          } else {
            console.error('Erro ao carregar modalidades ou conquistas:', err);
          }
        },
      });
    } else {
      console.error('Usuário não autenticado');
    }
  }

  compararModalidades(inscritas: any[], todas: any[]): any[] {
    // Verificando se as variáveis não são nulas ou indefinidas
    if (!inscritas || !todas) {
      return []; // Retorna um array vazio se algum dos parâmetros for nulo
    }

    // Criando arrays apenas com os IDs de cada modalidade para facilitar a comparação
    const inscritasIds = inscritas.map((mod) => mod.idModalidadeEsportiva);
    const todasIds = todas.map((mod) => mod.idModalidadeEsportiva);

    // Encontrando as modalidades que estão em 'todas' mas não em 'inscritas'
    const modalidadesDiferentes = todas.filter(
      (mod) => !inscritasIds.includes(mod.idModalidadeEsportiva)
    );

    return modalidadesDiferentes;
  }

  // Inscrição em uma modalidade
  inscreverModalidade(modalidadeId: number) {
    const user = this.authService.getUser();
    if (user) {
      const usuarioId = user.idAcademico;

      this.modalidadesService
        .inscreverModalidade(usuarioId, modalidadeId)
        .subscribe({
          next: (resp) => {
            this.stateModalidadesService.triggerUpdate(); // Dispara o evento de atualização
            this.ngOnInit(); // Atualiza a listagem
          },
          error: (err) => {
            console.error('Erro ao realizar inscrição:', err);
          },
        });
    }
  }

  // Remover inscrição de uma modalidade
  removerInscricaoModalidade(modalidadeId: number) {
    const user = this.authService.getUser();
    if (user) {
      const usuarioId = user.idAcademico;

      this.modalidadesService
        .removerModalidade(usuarioId, modalidadeId)
        .subscribe({
          next: (resp) => {
            this.stateModalidadesService.triggerUpdate(); // Dispara o evento de atualização
            this.ngOnInit(); // Atualiza a listagem
          },
          error: (err) => {
            console.error('Erro ao cancelar inscrição:', err);
          },
        });
    }
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
    this.modalEditarVisivel = true;
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }
}
