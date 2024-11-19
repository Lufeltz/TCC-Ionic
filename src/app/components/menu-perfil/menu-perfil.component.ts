import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaEsportivaService } from 'src/app/services/meta-esportiva.service';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
import { forkJoin, Subscription } from 'rxjs';
import { StateModalidadesService } from 'src/app/services/state-modalidades.service';

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

  user: Academico | null = null;
  metasDiarias: MetaDiaria[] = [];
  modalidadesUsuario: any[] = [];
  metasPorModalidade: MetaEsportiva[] = [];
  metasEsportivas: MetaEsportiva[] = [];
  metasPorModalidade2: {
    [key: number]: { idModalidadeEsportiva: number; metas: MetaEsportiva[] };
  } = {};
  metasPorModalidadeArray: any = [];

  private modalidadeUpdateSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private metaDiariaService: MetaDiariaService,
    private metaEsportivaService: MetaEsportivaService,
    private router: Router,
    private route: ActivatedRoute,
    private stateModalidadesService: StateModalidadesService
  ) {}

  ngOnInit() {
    // Inscrever-se nas mudanças do usuário
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        // Verificar se o usuário tem modalidades
        this.modalidadesUsuario = user.modalidades || [];
        if (this.modalidadesUsuario.length === 0) {
          // Se o usuário não estiver inscrito em nenhuma modalidade, limpa a lista
          this.metasEsportivas = []; // ou qualquer outra lógica desejada
        }
        this.loadMetasDiarias(); // Carrega as metas diárias
        this.loadMetasEsportivas(); // Carrega as metas esportivas
      } else {
        console.error('Usuário não autenticado');
      }
    });
  
    // Tenta carregar os dados do usuário logo que o componente for inicializado
    this.authService.loadToken().subscribe({
      next: () => {
        const user = this.authService.getUser(); // Obtém o usuário do serviço após carregar o token
        if (user) {
          this.user = user; // Armazena o usuário na variável local
          this.modalidadesUsuario = this.user.modalidades || [];
          if (this.modalidadesUsuario.length === 0) {
            // Se o usuário não tiver modalidades, limpe as metas
            this.metasEsportivas = [];
          }
          this.loadMetasDiarias();
          this.loadMetasEsportivas();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar token ou dados do usuário:', err);
      },
    });
  }
  

  goToPage(path: string): void {
    this.router.navigate([path]);
  }
  

  // Método para obter o nome da modalidade com base no id
  getModalidadeName(idModalidade: number): string | undefined {
    const modalidade = this.modalidadesUsuario.find(
      (m) => m.idModalidade === idModalidade
    );
    return modalidade ? modalidade.nomeModalidade : undefined;
  }

  // Carregar metas diárias para o usuário
  loadMetasDiarias(): void {
    if (!this.user) return;

    this.metaDiariaService
      .getMetaDiariaByAcademicoId(this.user.idAcademico)
      .subscribe({
        next: (data: MetaDiaria[] | null) => {
          if (data === null) {
            this.metasDiarias = [];
          } else {
            this.metasDiarias = data;
          }
        },
        error: (err) => {
          console.error('Erro ao buscar meta diária:', err);
        },
      });
  }

  // Carregar metas esportivas para o usuário
  loadMetasEsportivas(): void {
    if (!this.user || this.modalidadesUsuario.length === 0) return;

    const observables = this.modalidadesUsuario.map((modalidade) =>
      this.metaEsportivaService.getMetasPorModalidade(modalidade.idModalidade)
    );

    forkJoin(observables).subscribe({
      next: (resultados) => {
        this.metasPorModalidade2 = resultados
          .flat()
          .filter((meta): meta is MetaEsportiva => meta !== null)
          .reduce<{
            [key: number]: {
              idModalidadeEsportiva: number;
              metas: MetaEsportiva[];
            };
          }>((acc, meta) => {
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

        this.metasPorModalidadeArray = Object.values(this.metasPorModalidade2);
      },
      error: (err) => {
        console.error('Erro ao buscar metas esportivas:', err);
      },
    });
  }

  // Método de logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a página de login após logout
  }
}
