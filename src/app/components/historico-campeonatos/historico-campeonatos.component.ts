import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonButton,
  IonIcon,
  IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, lockOpen } from 'ionicons/icons';
import {
  BookmarkCheck,
  Calendar,
  CalendarArrowUp,
  CalendarCheck,
  CheckCheck,
  CircleCheckBig,
  CircleDollarSign,
  ExternalLink,
  Flag,
  Lock,
  LockOpen,
  LucideAngularModule,
  MapPin,
  MessageSquareCode,
  NotebookPen,
  NotebookText,
  RotateCw,
  SquareArrowUpRight,
  User,
  Users,
  UsersRound,
  Volleyball,
} from 'lucide-angular';
import { NgxMaskPipe } from 'ngx-mask';
import { Academico } from 'src/app/models/academico.model';
import { Campeonato } from 'src/app/models/campeonato.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';
import { Jogador } from 'src/app/models/jogador.model';
import { Time } from 'src/app/models/time.model';
import { AcademicoService } from 'src/app/services/academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { PartidaService } from 'src/app/services/partida.service';
import { BloqueadoComponent } from "../bloqueado/bloqueado.component";

@Component({
  selector: 'app-historico-campeonatos',
  templateUrl: './historico-campeonatos.component.html',
  styleUrls: ['./historico-campeonatos.component.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonIcon,
    IonButton,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    CommonModule,
    NgxMaskPipe,
    LucideAngularModule,
    RouterModule,
    BloqueadoComponent
],
})
export class HistoricoCampeonatosComponent implements OnInit {
  readonly SquareArrowUpRight = SquareArrowUpRight;
  readonly Lock = Lock;
  readonly LockOpen = LockOpen;
  readonly ExternalLink = ExternalLink;
  readonly CircleCheckBig = CircleCheckBig;
  readonly RotateCw = RotateCw;
  readonly BookmarkCheck = BookmarkCheck;
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

  @Input() username: string = '';
  academico: Academico | null = null;

  historicoCampeonatos: Campeonato[] = [];
  filteredCampeonatos: Campeonato[] = [];

  times: Time[] = [];
  jogadores: Jogador[] = []
  timesPorCampeonato: { [idCampeonato: number]: Time[] } = {};
  jogadoresPorCampeonato: { [idCampeonato: number]: Jogador[] } = [];
  error: string = '';  // Mensagem de erro
  loading: boolean = true;

  // Mapeamento das modalidades
  modalidades: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Vôlei',
    3: 'Basquete',
    4: 'Tênis de Mesa',
    5: 'Handebol',
    
  };

  getModalidadeNome(id: number): string {
    return this.modalidades[id] || 'Modalidade não encontrada';
  }

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
  } = {};

  isBlocked: boolean = false; // Controla se o usuário está bloqueado
  mensagemBloqueio: string = 'O acadêmico bloqueou a visualização do histórico.';  
  @Input() searchedCampeonatos: string = '';

  constructor(
    private authService: AuthService,
    private academicoService: AcademicoService,
    private campeonatoService: CampeonatoService,
    private partidaService: PartidaService
  ) {
    addIcons({ lockClosed, lockOpen });
  }

  currentPage: number = 0; // Página inicial
  totalPages: number = 5; // Defina como 1 inicialmente ou pegue o valor da resposta da API

  ngOnInit() {
    const usernameFinal =
      this.username || this.authService.getUser()?.username || '';

    if (usernameFinal) {
      this.buscarAcademicoPorUsername(usernameFinal);
    } else {
      console.error('Username não fornecido');
    }
  }

  listarTimesPorCampeonato(idCampeonato: number): void {
    this.loading = true;
    this.partidaService.listarTimes(idCampeonato).subscribe({
      next: (times: Time[]) => {
        // Armazena os times no objeto timesPorCampeonato usando o idCampeonato como chave
        this.timesPorCampeonato[idCampeonato] = times;
        console.log('times: ', this.timesPorCampeonato);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os times.';
        this.loading = false;
      }
    });
  }
  
  listarJogadoresPorCampeonato(idCampeonato: number): void {
    this.loading = true;
    this.partidaService.listarJogadores(idCampeonato).subscribe({
      next: (response: JogadorResponse) => {
        // Armazena os jogadores no objeto jogadoresPorCampeonato usando o idCampeonato como chave
        this.jogadoresPorCampeonato[idCampeonato] = response.content || [];
        console.log('jogadores:', this.jogadoresPorCampeonato);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os jogadores.';
        this.loading = false;
      }
    });
  }

  getHistoricoCampeonato(id: number, page: number, size: number, sort: string) {
    const idAcademico = this.academico?.idAcademico || 0; // Garantir que temos o ID do acadêmico
    const idUsuarioLogado = this.authService.getUser()?.idAcademico; // Obtendo o ID do usuário logado

    // Verificar se o idAcademico é igual ao id do usuário logado
    if (idAcademico === idUsuarioLogado) {
      this.campeonatoService
        .getHistoricoCampeonato(id, page, size, sort)
        .subscribe({
          next: (historico: any) => {
            if (historico && historico.content) {
              this.historicoCampeonatos = [
                ...this.historicoCampeonatos,
                ...historico.content,
              ];
              this.totalPages = historico.totalPages; // Atualiza o total de páginas
              console.log('Histórico de campeonatos:', this.historicoCampeonatos);
              
              // Para cada campeonato, carregar times e jogadores
              this.historicoCampeonatos.forEach((campeonato) => {
                this.listarTimesPorCampeonato(campeonato.idCampeonato);
                this.listarJogadoresPorCampeonato(campeonato.idCampeonato);
              });
            }
          },
          error: (err) => {
            // Verifique o código de status do erro
            if (err.status === 403) {
              this.isBlocked = true;  // Define como bloqueado
            } else {
              console.error('Erro ao buscar histórico de campeonatos:', err);
            }
          },
        });
    } else {
      this.campeonatoService
        .getHistoricoCampeonatoAcademico(id, page, size, sort)
        .subscribe({
          next: (historico: any) => {
            if (historico && historico.content) {
              this.historicoCampeonatos = [
                ...this.historicoCampeonatos,
                ...historico.content,
              ];
              this.totalPages = historico.totalPages; // Atualiza o total de páginas
              console.log('Histórico de campeonatos (Acadêmico):', this.historicoCampeonatos);
              
              // Para cada campeonato, carregar times e jogadores
              this.historicoCampeonatos.forEach((campeonato) => {
                this.listarTimesPorCampeonato(campeonato.idCampeonato);
                this.listarJogadoresPorCampeonato(campeonato.idCampeonato);
              });
            }
          },
          error: (err) => {
            // Verifique o código de status do erro
            if (err.status === 403) {
              this.isBlocked = true;  // Define como bloqueado
            } else {
              console.error('Erro ao buscar histórico de campeonatos para acadêmico:', err);
            }
          },
        });
    }
  }
  

  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico;
        if (this.academico) {
          const idAcademico = this.academico.idAcademico;
          this.getHistoricoCampeonato(
            idAcademico,
            this.currentPage,
            5,
            'dataCriacao,desc'
          );
        }
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      },
    });
  }


  

  // Função chamada ao clicar no botão 'Mais Campeonatos'
  carregarMaisCampeonatos() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++; // Incrementa a página
      const idAcademico = this.academico?.idAcademico || 0; // Garantir que temos o ID do acadêmico
      this.getHistoricoCampeonato(
        idAcademico,
        this.currentPage,
        5,
        'dataCriacao,desc'
      );
    } else {
      console.log('Não há mais campeonatos para carregar.');
    }
  }
}
