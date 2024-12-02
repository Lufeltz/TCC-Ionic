import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ArrowDownToDot,
  Bike,
  CalendarArrowUp,
  GraduationCap,
  LucideAngularModule,
  SquareX,
  Star,
  Trophy,
  UserRound,
  X,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { AcademicoService } from 'src/app/services/academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonButton, IonSearchbar } from '@ionic/angular/standalone';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { ConteudoVazioComponent } from '../conteudo-vazio/conteudo-vazio.component';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonButton,
    CommonModule,
    LucideAngularModule,
    FormsModule,
    ConteudoVazioComponent,
  ],
})
export class JogadorComponent implements OnInit {
  constructor(
    private academicoService: AcademicoService,
    private router: Router,
    private authService: AuthService,
    private campeonatoService: CampeonatoService
  ) {}

  @Input() searchedJogadores!: string;
  academicos: Academico[] = [];
  filteredJogadores: Academico[] = [];

  mensagem!: string;
  mensagem_detalhes!: string;

  currentPage: number = 0;
  pageSize: number = 5;

  jogadoresEnfrentados: Jogador[] = [];
  totalJogadoresEnfrentados: number = 0;

  estatisticasMap: Map<number, EstatisticaModalidade> = new Map();

  searchedCampeonatos: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  isBlocked: boolean = false;
  mensagemAusencia: string =
    'Você ainda não jogou com ninguém, participe de campeonatos para visualizar outros jogadores.';

  user: Academico | null = null;

  userLogado: Academico | null = null;

  readonly UserRound = UserRound;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly GraduationCap = GraduationCap;
  readonly Trophy = Trophy;
  readonly Star = Star;
  readonly Bike = Bike;
  readonly SquareX = SquareX;
  readonly ArrowDownToDot = ArrowDownToDot;

  ngOnInit() {
    this.userLogado = this.authService.getUser();
    this.getAcademicos();
    this.subscribeToSearch();
    this.getJogadoresEnfrentados();
  }

  onSearchInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  subscribeToSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(3000),
        switchMap((searchTerm: string) => {
          if (searchTerm.trim() === '') {
            this.getAcademicos();
            return [];
          }
          return this.academicoService.getAcademicoByUsername(searchTerm);
        })
      )
      .subscribe({
        next: (academico: Academico | null) => {
          if (academico) {
            this.filteredJogadores = [academico];
          } else {
            this.filteredJogadores = [];
          }
        },
        error: (err) => {
          this.mensagem = 'Erro buscando acadêmico';
          this.mensagem_detalhes = `[${err.status} ${err.message}]`;
        },
      });
  }

  filtrarJogadoresEnfrentados() {}

  getJogadoresEnfrentados(): void {
    if (this.userLogado) {
      const idAcademico = this.userLogado.idAcademico;
      const page = this.currentPage;
      const size = this.pageSize;

      this.campeonatoService
        .getJogadoresEnfrentados(idAcademico, page, size)
        .subscribe({
          next: (response: JogadorResponse | null) => {
            if (response) {
              if (response.content && response.content.length > 0) {
                this.jogadoresEnfrentados = response.content;
                this.totalJogadoresEnfrentados = response.totalElements || 0;
                this.filtrarJogadoresEnfrentados();
              } else {
                this.jogadoresEnfrentados = [];
                this.totalJogadoresEnfrentados = 0;
                this.filtrarJogadoresEnfrentados();
                this.isBlocked = true;
                this.mensagem = 'Você não tem jogadores enfrentados.';
                this.mensagem_detalhes =
                  'Nenhum jogador foi encontrado para este usuário.';
              }
            }
          },
          error: (err) => {
            this.mensagem = 'Erro buscando jogadores enfrentados';
            this.mensagem_detalhes = `[${err.status} ${err.message}]`;
          },
        });
    }
  }

  getAcademicos(): void {
    this.academicoService
      .getAllAcademicos(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {
          const data = response.content || [];
          if (this.currentPage === 0) {
            this.academicos = data;
          } else {
            this.academicos = [...this.academicos, ...data];
          }
          this.filteredJogadores = this.academicos;

          this.academicos.forEach((academico) => {
            if (academico.modalidades && academico.modalidades.length > 0) {
              const primeiraModalidade = academico.modalidades[0];
              this.getEstatisticas(
                academico.idAcademico,
                primeiraModalidade.idModalidade
              );
            }
          });
        },
        error: (err) => {
          this.mensagem = 'Erro buscando lista de acadêmicos';
          this.mensagem_detalhes = `[${err.status} ${err.message}]`;
        },
      });
  }

  loadMore(): void {
    this.currentPage++;
    this.getAcademicos();
  }

  navigateToPerfil(academico: Academico): void {
    this.router.navigate(['/perfil-outro-usuario', academico.username]);
  }

  getEstatisticas(academicoId: number, modalidadeId: number | null): void {
    if (modalidadeId) {
      this.academicoService
        .getEstatisticasPorModalidade(academicoId, modalidadeId)
        .subscribe({
          next: (response: EstatisticaModalidade) => {
            this.estatisticasMap.set(academicoId, response);
          },
          error: (err) => {
            console.error('Erro ao buscar estatísticas', err);
          },
        });
    } else {
      const estatisticasPadrão: EstatisticaModalidade = {
        modalidade: 'Sem Modalidade',
        vitorias: 0,
        derrotas: 0,
        jogos: 0,
        avaliacao: {
          media: 0.0,
          quantidadeAvaliacoes: 0,
        },
      };

      this.estatisticasMap.set(academicoId, estatisticasPadrão);
    }
  }

  getModalidades(academico: any): string {
    if (academico.modalidades && academico.modalidades.length > 0) {
      return academico.modalidades
        .map((modalidade: any) => modalidade.nomeModalidade)
        .join(', ');
    } else {
      return 'Sem modalidades';
    }
  }

  getEstatisticasDoAcademico(
    academicoId: number
  ): EstatisticaModalidade | undefined {
    return this.estatisticasMap.get(academicoId);
  }
}
