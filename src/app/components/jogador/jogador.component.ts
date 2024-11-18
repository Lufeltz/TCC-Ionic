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
import { IonButton } from '@ionic/angular/standalone';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, LucideAngularModule],
})
export class JogadorComponent implements OnInit, OnChanges {
  @Input() searchedJogadores!: string;
  academicos: Academico[] = [];
  public filteredJogadores: Academico[] = [];
  mensagem!: string;
  mensagem_detalhes!: string;

  // Controle de carregamento de mais jogadores
  currentPage: number = 0;
  pageSize: number = 5;

  // Variável para armazenar as estatísticas por acadêmico
  estatisticasMap: Map<number, EstatisticaModalidade> = new Map();
  

  readonly UserRound = UserRound;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly GraduationCap = GraduationCap;
  readonly Trophy = Trophy;
  readonly Star = Star;
  readonly Bike = Bike;
  readonly SquareX = SquareX;
  readonly ArrowDownToDot = ArrowDownToDot;

  constructor(
    private academicoService: AcademicoService,
    private router: Router,
    private authService: AuthService
  ) {}

  user: Academico | null = null;

  ngOnInit() {
    this.getUsuarios();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchedJogadores']) {
      this.filterJogadores();
    }
  }

  getUsuarios(): void {
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

          // Chama as estatísticas para cada acadêmico usando o id da primeira modalidade
          this.academicos.forEach((academico) => {
            if (academico.modalidades && academico.modalidades.length > 0) {
              const primeiraModalidade = academico.modalidades[0];
              this.getEstatisticas(academico.idAcademico, primeiraModalidade.idModalidade);
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
    this.getUsuarios();
  }

  navigateToPerfil(academico: Academico): void {
    this.router.navigate(['/perfil-outro-usuario', academico.username]);
  }

  // Chama o serviço para obter as estatísticas por modalidade
  getEstatisticas(academicoId: number, modalidadeId: number | null): void {
    if (modalidadeId) {
      this.academicoService.getEstatisticasPorModalidade(academicoId, modalidadeId).subscribe({
        next: (response: EstatisticaModalidade) => {
          // Armazena as estatísticas associadas ao ID do acadêmico
          this.estatisticasMap.set(academicoId, response);
        },
        error: (err) => {
          console.error('Erro ao buscar estatísticas', err);
        },
      });
    } else {
      // Caso não tenha modalidades, definimos valores padrão
      const estatisticasPadrão: EstatisticaModalidade = {
        modalidade: 'Sem Modalidade',  // Valor padrão para modalidade
        vitorias: 0,
        derrotas: 0,
        jogos: 0,
        avaliacao: {
          media: 0.0,
          quantidadeAvaliacoes: 0
        }
      };
  
      this.estatisticasMap.set(academicoId, estatisticasPadrão);
    }
  }
  
  

  // Filtra os jogadores com base no nome ou curso
  filterJogadores() {
    if (!this.searchedJogadores) {
      this.filteredJogadores = this.academicos;
    } else {
      const searchTerm = this.searchedJogadores.toLowerCase();
      this.filteredJogadores = this.academicos.filter(
        (jogadores) =>
          jogadores.username.toLowerCase().includes(searchTerm) ||
          jogadores.curso.toLowerCase().includes(searchTerm)
      );
    }

    if (!Array.isArray(this.filteredJogadores)) {
      this.filteredJogadores = [];
    }
  }

  // Obtém as modalidades de um acadêmico
  getModalidades(academico: any): string {
    if (academico.modalidades && academico.modalidades.length > 0) {
      return academico.modalidades
        .map((modalidade: any) => modalidade.nomeModalidade)
        .join(', ');
    } else {
      return 'Sem modalidades';
    }
  }

  // Obtém as estatísticas para um acadêmico a partir do mapa
  getEstatisticasDoAcademico(academicoId: number): EstatisticaModalidade | undefined {
    return this.estatisticasMap.get(academicoId);
  }
}
