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
import { CampeonatoStatusComponent } from 'src/app/components/campeonato-status/campeonato-status.component';
import { CampeonatoTimesComponent } from 'src/app/components/campeonato-times/campeonato-times.component';

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
    CampeonatoTimesComponent,
    CampeonatoStatusComponent,
  ],
})
export class CampeonatoGerenciamentoPage implements OnInit {
  constructor() {}

  pageTitle: string = 'Gerenciamento';
  pageMenu: string = 'campeonato-gerenciamento';
  pageContent: string = 'campeonato-gerenciamento';

  selectedSegment: string = 'detalhes';

  modalidadesSimplificadas: { idModalidadeEsportiva: number; nome: string }[] =
    [];
  mensagem!: string;
  mensagem_detalhes!: string;
  loading: boolean = true;

  campeonato: Campeonato = new Campeonato();

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

  ngOnInit() {
    this.loading = false;
  }

  getNomeModalidade(id: number): string | undefined {
    const modalidade = this.modalidadesSimplificadas.find(
      (mod) => mod.idModalidadeEsportiva === id
    );
    return modalidade ? modalidade.nome : 'Modalidade não encontrada';
  }

  getLockColor(privacidade: string): string {
    return privacidade === 'PRIVADO'
      ? 'var(--light-red)'
      : 'var(--text-new-green)';
  }
}
