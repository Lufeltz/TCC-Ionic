import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { AcademicoService } from 'src/app/services/academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { CampeonatoService } from 'src/app/services/campeonato.service';

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

  @Input() searchedCampeonatos: string = '';

  constructor(
    private authService: AuthService,
    private academicoService: AcademicoService,
    private campeonatoService: CampeonatoService
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

  getHistoricoCampeonato(id: number, page: number, size: number, sort: string) {
    this.campeonatoService
      .getHistoricoCampeonato(id, page, size, sort)
      .subscribe({
        next: (historico: any) => {
          if (historico && historico.content) {
            // Carregar mais campeonatos na lista
            this.historicoCampeonatos = [
              ...this.historicoCampeonatos,
              ...historico.content,
            ];
            this.totalPages = historico.totalPages; // Atualiza o total de páginas
            console.log('Histórico de campeonatos:', this.historicoCampeonatos);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar histórico de campeonatos:', err);
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

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['statusToggles'] || changes['searchedCampeonatos']) {
  //     this.filterCampeonatos();
  //   }
  // }

  // filterCampeonatos() {
  //   const {
  //     aberto = true,
  //     finalizado = true,
  //     iniciado = true,
  //   } = this.statusToggles;

  //   const searchTerm = this.searchedCampeonatos.toLowerCase();

  //   this.filteredCampeonatos = this.campeonatos.filter((campeonato) => {
  //     const matchesStatus =
  //       (aberto && campeonato.status === 'aberto') ||
  //       (finalizado && campeonato.status === 'finalizado') ||
  //       (iniciado && campeonato.status === 'iniciado');

  //     const matchesSearchTerm =
  //       campeonato.titulo.toLowerCase().includes(searchTerm) ||
  //       campeonato.descricao.toLowerCase().includes(searchTerm);

  //     return matchesStatus && matchesSearchTerm;
  //   });
  // }
}
