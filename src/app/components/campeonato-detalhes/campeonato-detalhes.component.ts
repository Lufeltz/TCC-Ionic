import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AlertButton } from '@ionic/angular/standalone';
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
  CircleX,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { Campeonato } from 'src/app/models/campeonato.model';
import { ModalidadeEsportiva } from 'src/app/models/modalidades.model';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { TitleCasePipe } from 'src/app/pipes/title-case.pipe';
import { NgxMaskPipe } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';
import { Time } from 'src/app/models/time.model';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';
@Component({
  selector: 'app-campeonato-detalhes',
  templateUrl: './campeonato-detalhes.component.html',
  standalone: true,
  styleUrls: ['./campeonato-detalhes.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPerfilComponent,
    LucideAngularModule,
    TitleCasePipe,
    NgxMaskPipe,
  ],
})
export class CampeonatoDetalhesComponent implements OnInit {
  constructor(
    private campeonatoService: CampeonatoService,
    private alertController: AlertController,
    private modalidadeService: ModalidadesService,
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private authService: AuthService,
    private stateService: StateService,
    private router: Router
  ) {}

  campeonato: Campeonato | null = null;
  modalidades: ModalidadeEsportiva[] = [];
  modalidadesSimplificadas: { idModalidadeEsportiva: number; nome: string }[] =
    [];

  mensagem!: string;
  mensagem_detalhes!: string;
  loading: boolean = true;
  academico: Academico | null = null;

  codigo: string = '';
  error: string = '';

  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  times: Time[] = [];
  jogadores: Jogador[] = [];

  alertButtons: AlertButton[] = [];

  usuarioLogado: Academico | null = null;

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
  readonly CircleX = CircleX;

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();
    this.loadModalidades();
    this.route.paramMap.subscribe((params) => {
      this.codigo = params.get('codigo')!;
    });
    this.buscarCampeonatoPorCodigo(this.codigo);
  }

  getLockColor(privacidade: string): string {
    return privacidade === 'PRIVADO'
      ? 'var(--light-red)'
      : 'var(--text-new-green)';
  }

  excluirCampeonatoAlert(campeonato: Campeonato) {
    const alertButtons: AlertButton[] = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Exclusão cancelada');
        },
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.deletarCampeonato(campeonato.idCampeonato);
          this.stateService.triggerUpdateListagemCampeonatos();
        },
      },
    ];

    this.exibirAlerta(campeonato.titulo, alertButtons);
  }

  async exibirAlerta(campeonatoTitulo: string, buttons: AlertButton[]) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza de que gostaria de excluir o campeonato ${campeonatoTitulo}?`,
      buttons: buttons,
    });
    this.stateService.triggerUpdateListagemCampeonatos();
    await alert.present();
  }

  deletarCampeonato(idCampeonato: number) {
    this.campeonatoService.excluirCampeonato(idCampeonato).subscribe({
      next: () => {
        this.stateService.triggerUpdateListagemCampeonatos();
        this.router.navigate(['/homepage/feed']);
      },
      error: (err) => {
        console.error('Erro ao excluir o campeonato:', err);
      },
    });
  }

  listarTimesPorCampeonato(idCampeonato: number): void {
    this.loading = true;
    this.partidaService.listarTimes(idCampeonato).subscribe({
      next: (times: Time[]) => {
        this.times = times;
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
        this.jogadores = response.content || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os jogadores.';
        this.loading = false;
      },
    });
  }

  buscarCampeonatoPorCodigo(codigo: string): void {
    this.loading = true;
    this.campeonatoService.filtrarCampeonatos(codigo).subscribe({
      next: (campeonatos) => {
        if (campeonatos && campeonatos.length > 0) {
          this.campeonato = campeonatos[0];
          this.listarTimesPorCampeonato(this.campeonato.idCampeonato);
          this.listarJogadoresPorCampeonato(this.campeonato.idCampeonato);
          console.log(this.campeonato.idCampeonato);
        } else {
          this.campeonato = null;
          console.warn('Campeonato não encontrado');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar campeonato:', err);
        this.loading = false;
      },
    });
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
