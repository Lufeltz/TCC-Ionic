import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  ArrowDownToDot,
  Calendar,
  CalendarArrowUp,
  CalendarCheck,
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
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { TitleCasePipe } from 'src/app/pipes/title-case.pipe';
import { Campeonato } from 'src/app/models/campeonato.model';
import { CampeonatoDetalhesComponent } from '../../components/campeonato-detalhes/campeonato-detalhes.component';
import { CampeonatoAcoesComponent } from 'src/app/components/campeonato-acoes/campeonato-acoes.component';
import { CampeonatoStatusComponent } from 'src/app/components/campeonato-status/campeonato-status.component';

@Component({
  selector: 'app-campeonato-gerenciamento',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './campeonato-gerenciamento.page.html',
  styleUrls: ['./campeonato-gerenciamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPerfilComponent,
    LucideAngularModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TitleCasePipe,
    CampeonatoDetalhesComponent,
    CampeonatoAcoesComponent,
    CampeonatoStatusComponent,
  ],
})
export class CampeonatoGerenciamentoPage implements OnInit {
  pageTitle: string = 'Gerenciamento';
  pageMenu: string = 'campeonato-gerenciamento';
  pageContent: string = 'campeonato-gerenciamento';

  selectedSegment: string = 'detalhes';

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

  modalidadesSimplificadas: { idModalidadeEsportiva: number; nome: string }[] =
    [];
  mensagem!: string;
  mensagem_detalhes!: string;
  loading: boolean = true;

  campeonato: Campeonato = new Campeonato();

  constructor() {}

  ngOnInit() {
    // console.log(this.campeonatos);
    this.loading = false; // Defina como falso após carregar os dados
  }

  getNomeModalidade(id: number): string | undefined {
    // Busca o nome da modalidade no array de modalidades simplificadas
    const modalidade = this.modalidadesSimplificadas.find(
      (mod) => mod.idModalidadeEsportiva === id
    );
    return modalidade ? modalidade.nome : 'Modalidade não encontrada'; // Retorna o nome ou uma mensagem de erro
  }

  getLockColor(privacidade: string): string {
    return privacidade === 'PRIVADO'
      ? 'var(--light-red)'
      : 'var(--text-new-green)'; // 'red' para 'privado', 'green' para 'público'
  }
}
