import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  schoolOutline,
  notificationsOutline,
  eyeOffOutline,
  settingsOutline,
  bicycleOutline,
  addCircleOutline,
  starOutline,
  calendarNumberOutline,
  logOutOutline,
  medkitOutline,
  analyticsOutline,
} from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import {
  Bell,
  Calendar1,
  ChartNoAxesCombined,
  DiamondPlus,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  LogOut,
  LucideAngularModule,
  MessageCirclePlus,
  Settings,
  ShieldPlus,
  Star,
  User,
} from 'lucide-angular';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaEsportivaService } from 'src/app/services/meta-esportiva.service';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonIcon,
    RouterModule,
    LucideAngularModule,
  ],
})
export class MenuPerfilComponent implements OnInit {
  @Input() title: string = '';
  @Input() menu: string = '';
  @Input() menuContentId: string = '';

  readonly User = User;
  readonly GraduationCap = GraduationCap;
  readonly Bell = Bell;
  readonly ShieldPlus = ShieldPlus;
  readonly HeartPulse = HeartPulse;
  readonly ChartNoAxesCombined = ChartNoAxesCombined;
  readonly Settings = Settings;
  readonly Calendar1 = Calendar1;
  readonly DiamondPlus = DiamondPlus;
  readonly Dumbbell = Dumbbell;
  readonly Star = Star;
  readonly LogOut = LogOut;

  user: Academico | null = new Academico();
  metasDiarias: MetaDiaria[] = [];

  modalidadesUsuario: any[] = [];
  metasPorModalidade: MetaEsportiva[] = [];
  metasEsportivas: MetaEsportiva[] = [];
  metasPorModalidade2: { [key: number]: { idModalidadeEsportiva: number, metas: MetaEsportiva[] } } = {};
  metasPorModalidadeArray:any = []

  constructor(
    private authService: AuthService,
    private metaDiariaService: MetaDiariaService,
    private metaEsportivaService: MetaEsportivaService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser(); // Obtém o usuário autenticado
    if (user) {
      this.user = user; // Armazena o usuário na variável user
      this.modalidadesUsuario = this.user.modalidades || []; // Atribui as modalidades ao usuário
      console.log('Modalidades do usuário:', this.modalidadesUsuario); // Log para conferir os dados
      this.loadMetasDiarias(); // Chama a função para listar as metas diárias
      this.loadMetasEsportivas(); // Chama a função para listar as metas esportivas
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

  loadMetasDiarias(): void {
    this.metaDiariaService
      .getMetaDiariaByAcademicoId(this.user!.idAcademico) // Usando this.user.idAcademico
      .subscribe({
        next: (data: MetaDiaria[] | null) => {
          if (data === null) {
            this.metasDiarias = [];
          } else {
            this.metasDiarias = data;
            console.log('Dados da meta diária:', this.metasDiarias);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar meta diária:', err);
        },
      });
  }

  loadMetasEsportivas(): void {
    // Cria uma lista de observables para todas as modalidades do usuário
    const observables = this.modalidadesUsuario.map((modalidade) =>
      this.metaEsportivaService.getMetasPorModalidade(modalidade.idModalidade)
    );
  
    // Usa forkJoin para aguardar todas as requisições
    forkJoin(observables).subscribe({
      next: (resultados) => {
        // Agrupa as metas por modalidade
        this.metasPorModalidade2 = resultados
          .flat()
          .filter((meta): meta is MetaEsportiva => meta !== null)
          .reduce<{ [key: number]: { idModalidadeEsportiva: number; metas: MetaEsportiva[] } }>((acc, meta) => {
            const modalidadeId = meta.idModalidadeEsportiva;
            if (!acc[modalidadeId]) {
              acc[modalidadeId] = {
                idModalidadeEsportiva: modalidadeId,
                metas: [],
              };
            }
            acc[modalidadeId].metas.push(meta);
            return acc;
          }, {});
  
        // Converte o objeto para um array
        this.metasPorModalidadeArray = Object.values(this.metasPorModalidade2);
  
        console.log('Metas agrupadas por modalidade:', this.metasPorModalidade2);
        console.log('Metas esportivas como array:', this.metasPorModalidadeArray);
      },
      error: (err) => {
        console.error('Erro ao buscar metas esportivas:', err);
      },
    });
  }
  
  
  
  

  logout() {
    this.authService.logout();
  }
}
