import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonButton,
  IonIcon,
  IonToggle,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { NgxMaskPipe } from 'ngx-mask';
import { AlertController } from '@ionic/angular';
import {
  LockOpen,
  LucideAngularModule,
  Lock,
  SquareArrowUpRight,
  ExternalLink,
  RotateCw,
  Users,
  User,
  Volleyball,
  MessageSquareCode,
  Flag,
  MapPin,
  CalendarCheck,
  CalendarArrowUp,
  Calendar,
  CircleDollarSign,
  NotebookText,
  NotebookPen,
  UsersRound,
  ArrowDownToDot,
  UserPlus,
} from 'lucide-angular';
import { Campeonato } from 'src/app/models/campeonato.model';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from 'src/app/pipes/title-case.pipe';
import { ModalidadeEsportiva } from 'src/app/models/modalidades.model';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { Academico } from 'src/app/models/academico.model';
import { RouterModule } from '@angular/router';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { Time } from 'src/app/models/time.model';
import { PartidaService } from 'src/app/services/partida.service';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConteudoVazioComponent } from '../conteudo-vazio/conteudo-vazio.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-listagem-campeonatos',
  templateUrl: './listagem-campeonatos.component.html',
  styleUrls: ['./listagem-campeonatos.component.scss'],
  imports: [
    IonSearchbar,
    IonToggle,
    IonIcon,
    IonButton,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    CommonModule,
    NgxMaskPipe,
    LucideAngularModule,
    FormsModule,
    TitleCasePipe,
    RouterModule,
    ConteudoVazioComponent,
  ],
  standalone: true,
})
export class ListagemCampeonatosComponent implements OnInit {
  constructor(
    private alertController: AlertController,
    private campeonatoService: CampeonatoService,
    private modalidadeService: ModalidadesService,
    private partidaService: PartidaService,
    private authService: AuthService,
    private stateService: StateService
  ) {}

  campeonatos: Campeonato[] = [];
  modalidades: ModalidadeEsportiva[] = [];
  modalidadesSimplificadas: { idModalidadeEsportiva: number; nome: string }[] =
    [];

  mensagem!: string;
  mensagem_detalhes!: string;
  filteredCampeonatos: Campeonato[] = [];
  academico: Academico | null = null;

  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  searchedCampeonatos: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  loading: boolean = true;
  times: Time[] = [];
  jogadores: Jogador[] = [];
  timesPorCampeonato: { [idCampeonato: number]: Time[] } = {};
  jogadoresPorCampeonato: { [idCampeonato: number]: Jogador[] } = [];
  error: string = '';
  showLoadMoreButton: boolean = true;

  isBlocked: boolean = false;
  mensagemAusencia: string =
    'Não há campeonatos disponíveis. Inscreva-se em alguma modalidade para visualizá-los';

  readonly SquareArrowUpRight = SquareArrowUpRight;
  readonly Lock = Lock;
  readonly LockOpen = LockOpen;
  readonly ExternalLink = ExternalLink;
  readonly RotateCw = RotateCw;
  readonly UsersRound = UsersRound;
  readonly Users = Users;
  readonly User = User;
  readonly Volleyball = Volleyball;
  readonly MessageSquareCode = MessageSquareCode;
  readonly Flag = Flag;
  readonly MapPin = MapPin;
  readonly CalendarCheck = CalendarCheck;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly Calendar = Calendar;
  readonly CircleDollarSign = CircleDollarSign;
  readonly NotebookText = NotebookText;
  readonly NotebookPen = NotebookPen;
  readonly ArrowDownToDot = ArrowDownToDot;
  readonly UserPlus = UserPlus;

  ngOnInit() {
    this.academico = this.authService.getUser();
    this.loadModalidades();
    this.subscribeToSearch();
    if (this.academico) {
      this.listarCampeonatos();

      this.stateService.updateCampeonatos$.subscribe(() => {
        this.listarCampeonatos();
      });
    }
  }

  listarTimesPorCampeonato(idCampeonato: number): void {
    this.loading = true;
    this.partidaService.listarTimes(idCampeonato).subscribe({
      next: (times: Time[]) => {
        this.timesPorCampeonato[idCampeonato] = times;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os times.';
        this.loading = false;
      },
    });
  }

  listarJogadoresPorCampeonato(idCampeonato: number): void {
    this.loading = true;
    this.partidaService.listarJogadores(idCampeonato).subscribe({
      next: (response: JogadorResponse) => {
        this.jogadoresPorCampeonato[idCampeonato] = response.content || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os jogadores.';
        this.loading = false;
      },
    });
  }

  listarCampeonatos(): void {
    this.academico = this.authService.getUser();
    if (this.academico) {
      this.loading = true;

      this.campeonatoService
        .getCampeonatosPorModalidadeAcademico(
          this.academico.idAcademico,
          0,
          this.pageSize,
          'dataCriacao,desc'
        )
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            if (data.content && data.content.length > 0) {
              this.campeonatos = data.content;
              this.totalPages = data.totalPages;
              this.currentPage = 1;
              this.campeonatos.forEach((campeonato) => {
                this.listarTimesPorCampeonato(campeonato.idCampeonato);
                this.listarJogadoresPorCampeonato(campeonato.idCampeonato);
              });
            } else {
              this.campeonatos = [];
              this.isBlocked = true;
            }
          },
          error: (err) => {
            this.loading = false;
            this.mensagem = 'Erro buscando lista de campeonatos';
            this.mensagem_detalhes = `[${err.status} ${err.message}]`;
            if (err.status === 404) {
              this.isBlocked = true;

              this.mensagemAusencia = `Não há campeonatos disponíveis no momento. Você pode ver as modalidades disponíveis <a href="/homepage/modalidades">aqui</a>.`;
            }
          },
        });
    } else {
      console.error('Usuário não logado');
      this.loading = false;
    }
  }

  listarMaisCampeonatos(): void {
    this.academico = this.authService.getUser();
    if (this.academico) {
      if (this.loading) return;

      this.loading = true;

      this.campeonatoService
        .getCampeonatosPorModalidadeAcademico(
          this.academico.idAcademico,
          this.currentPage,
          this.pageSize,
          'dataCriacao,desc'
        )
        .subscribe({
          next: (data: any) => {
            this.loading = false;

            if (data.content && data.content.length > 0) {
              this.campeonatos = [...this.campeonatos, ...data.content];
              this.currentPage++;
              this.totalPages = data.totalPages;
            } else {
              console.log('Não há mais campeonatos para carregar.');
            }
          },
          error: (err) => {
            this.loading = false;

            if (err.status === 500) {
              console.log('Erro 500: Não há mais campeonatos para carregar.');
              this.showLoadMoreButton = false;
            }

            this.mensagem = 'Erro buscando mais campeonatos';
            this.mensagem_detalhes = `[${err.status} ${err.message}]`;
          },
        });
    } else {
      console.error('Usuário não logado');
      this.loading = false;
    }
  }

  subscribeToSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(3000),
        switchMap((searchTerm) => {
          if (searchTerm.startsWith('#')) {
            const codigo = searchTerm;
            return this.campeonatoService.filtrarCampeonatos(codigo, undefined);
          } else {
            return this.campeonatoService.filtrarCampeonatos(
              undefined,
              searchTerm
            );
          }
        })
      )
      .subscribe({
        next: (campeonatos) => {
          this.campeonatos = campeonatos || [];
          this.filteredCampeonatos = this.campeonatos;
        },
        error: (err) => {
          console.error('Erro ao buscar campeonatos', err);
        },
      });
  }

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
    participando?: boolean;
  } = { participando: true };

  onSearchInput(event: any): void {
    this.searchedCampeonatos = event.target.value;
    this.searchSubject.next(this.searchedCampeonatos);
  }

  getLockColor(privacidade: string): string {
    return privacidade === 'PRIVADO'
      ? 'var(--light-red)'
      : 'var(--text-new-green)';
  }

  loadModalidades(): void {
    this.modalidadeService.getAllModalidades().subscribe({
      next: (modalidades) => {
        if (modalidades && modalidades.length > 0) {
          this.modalidades = modalidades;
          this.gerarModalidadesSimplificadas();
        } else {
          console.warn('Nenhuma modalidade encontrada');
          this.modalidades = [];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar modalidades', err);
      },
    });
  }

  gerarModalidadesSimplificadas(): void {
    if (Array.isArray(this.modalidades) && this.modalidades.length > 0) {
      this.modalidadesSimplificadas = this.modalidades.map((modalidade) => ({
        idModalidadeEsportiva: modalidade.idModalidadeEsportiva,
        nome: modalidade.nome,
      }));
    } else {
      console.warn(
        'A lista de modalidades está vazia ou com formato incorreto'
      );
    }
  }

  getNomeModalidade(id: number): string | undefined {
    const modalidade = this.modalidadesSimplificadas.find(
      (mod) => mod.idModalidadeEsportiva === id
    );
    return modalidade ? modalidade.nome : 'Modalidade não encontrada';
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.listarCampeonatos();
    }
  }

  async presentAlertPrompt(campeonato: Campeonato, errorMessage: string = '') {
    const alert = await this.alertController.create({
      header: 'Insira a senha',
      message: errorMessage,
      inputs: [
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Senha',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operação cancelada');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            this.verificarSenha(campeonato, data.senha);
          },
        },
      ],
    });

    await alert.present();
  }

  verificarSenha(campeonato: Campeonato, senha: string) {
    const senhaCorreta = 'senha123';

    if (senha === senhaCorreta) {
    } else {
      this.presentAlertPrompt(campeonato, 'Senha errada. Tente novamente.');
    }
  }
}
