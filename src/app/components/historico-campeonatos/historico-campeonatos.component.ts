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

interface Endereco {
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: number;
  complemento: string;
}

interface Campeonato {
  codigo: string;
  titulo: string;
  descricao: string;
  aposta: string;
  dataCriacao: string;
  dataInicio: string;
  dataFim: string;
  limiteParticipantes: number;
  status: 'aberto' | 'iniciado' | 'finalizado';
  endereco: Endereco;
  privacidadeCampeonato: 'privado' | 'aberto';
}

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
export class HistoricoCampeonatosComponent implements OnInit, OnChanges {
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

  campeonatos: Campeonato[] = [
    {
      codigo: 'LKM90',
      titulo: 'Campeonato de Verão',
      descricao: 'Competição anual de verão',
      aposta: 'R$ 500,00',
      dataCriacao: '2023-01-01',
      dataInicio: '2023-02-01',
      dataFim: '2023-03-01',
      limiteParticipantes: 50,
      status: 'aberto',
      endereco: {
        cep: '12345678',
        uf: 'SP',
        cidade: 'São Paulo',
        bairro: 'Centro',
        rua: 'Rua das Flores',
        numero: 100,
        complemento: 'Próximo ao parque',
      },
      privacidadeCampeonato: 'aberto',
    },
    {
      codigo: 'HGY86',
      titulo: 'Campeonato de Inverno',
      descricao: 'Competição anual de inverno',
      aposta: 'R$ 1000,00',
      dataCriacao: '2023-06-01',
      dataInicio: '2023-07-01',
      dataFim: '2023-08-01',
      limiteParticipantes: 30,
      status: 'iniciado',
      endereco: {
        cep: '87654321',
        uf: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Avenida Atlântica',
        numero: 200,
        complemento: 'Em frente à praia',
      },
      privacidadeCampeonato: 'privado',
    },
    {
      codigo: 'ASH46',
      titulo: 'Campeonato de Primavera',
      descricao: 'Competição anual de primavera',
      aposta: 'R$ 750,00',
      dataCriacao: '2023-09-01',
      dataInicio: '2023-10-01',
      dataFim: '2023-11-01',
      limiteParticipantes: 40,
      status: 'finalizado',
      endereco: {
        cep: '11223344',
        uf: 'MG',
        cidade: 'Belo Horizonte',
        bairro: 'Savassi',
        rua: 'Rua dos Pioneiros',
        numero: 300,
        complemento: 'Próximo ao shopping',
      },
      privacidadeCampeonato: 'aberto',
    },
  ];

  filteredCampeonatos: Campeonato[] = [];

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
  } = {};

  @Input() searchedCampeonatos: string = '';

  constructor() {
    addIcons({ lockClosed, lockOpen });
  }

  ngOnInit() {
    this.filterCampeonatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statusToggles'] || changes['searchedCampeonatos']) {
      this.filterCampeonatos();
    }
  }

  filterCampeonatos() {
    const {
      aberto = true,
      finalizado = true,
      iniciado = true,
    } = this.statusToggles;

    const searchTerm = this.searchedCampeonatos.toLowerCase();

    this.filteredCampeonatos = this.campeonatos.filter((campeonato) => {
      const matchesStatus =
        (aberto && campeonato.status === 'aberto') ||
        (finalizado && campeonato.status === 'finalizado') ||
        (iniciado && campeonato.status === 'iniciado');

      const matchesSearchTerm =
        campeonato.titulo.toLowerCase().includes(searchTerm) ||
        campeonato.descricao.toLowerCase().includes(searchTerm);

      return matchesStatus && matchesSearchTerm;
    });
  }
}
