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
export class JogadorComponent implements OnInit, OnChanges {
  @Input() searchedJogadores!: string;
  academicos: Academico[] = [];
  public filteredJogadores: Academico[] = []; // Para armazenar a lista filtrada de acadêmicos

  mensagem!: string;
  mensagem_detalhes!: string;

  // Controle de carregamento de mais jogadores
  currentPage: number = 0;
  pageSize: number = 5;

  // Variáveis para armazenar jogadores enfrentados
  public jogadoresEnfrentados: Jogador[] = []; // Lista dos jogadores que o usuário enfrentou
  public totalJogadoresEnfrentados: number = 0; // Total de jogadores enfrentados

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

  searchedCampeonatos: string = ''; // Variável que armazenará o valor da pesquisa
  searchSubject: Subject<string> = new Subject<string>(); // Subject para pesquisa

  isBlocked: boolean = false; // Controla se o usuário está bloqueado
  mensagemAusencia: string =
    'Você ainda não jogou com ninguém, participe de campeonatos para visualizar outros jogadores.';

  constructor(
    private academicoService: AcademicoService,
    private router: Router,
    private authService: AuthService,
    private campeonatoService: CampeonatoService
  ) {}

  user: Academico | null = null;

  userLogado: Academico | null = null;

  ngOnInit() {
    this.userLogado = this.authService.getUser();
    this.getUsuarios();
    this.subscribeToSearch(); // Inscreve-se para realizar a pesquisa
    this.getJogadoresEnfrentados();
  }

  // Método que é chamado sempre que o usuário digita no IonSearchbar
  onSearchInput(event: any): void {
    this.searchedJogadores = event.target.value; // Atualiza o valor da pesquisa
    this.filterJogadores(); // Aplica o filtro sempre que houver uma mudança no valor
  }

  subscribeToSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(3000), // Espera 3 segundos após a última digitação
        switchMap(() => {
          return this.academicoService.getAllAcademicos(
            this.currentPage,
            this.pageSize
          ); // Carrega todos os acadêmicos
        })
      )
      .subscribe({
        next: (response) => {
          // Verifica se a resposta é um array válido ou um valor null
          this.academicos = Array.isArray(response) ? response : []; // Garantir que seja um array
          this.filteredJogadores = this.academicos; // Atribui todos os acadêmicos a filteredJogadores

          // Agora aplica o filtro após a lista ser carregada
          this.filterJogadores(); // Aplica o filtro com base no que foi digitado no campo de pesquisa
        },
        error: (err) => {
          this.mensagem = 'Erro buscando lista de acadêmicos';
          this.mensagem_detalhes = `[${err.status} ${err.message}]`;
        },
      });
  }

  filterJogadores(): void {
    // Primeiro, inicia com a lista completa de acadêmicos
    let jogadoresParaFiltrar = [...this.academicos];

    if (this.searchedJogadores && this.searchedJogadores.trim() !== '') {
      const searchTerm = this.searchedJogadores.toLowerCase().trim();
      jogadoresParaFiltrar = jogadoresParaFiltrar.filter(
        (academico) =>
          academico.username &&
          academico.username.toLowerCase().includes(searchTerm)
      );
    }

    // Agora, aplica o filtro de jogadores enfrentados
    if (this.jogadoresEnfrentados.length > 0) {
      jogadoresParaFiltrar = jogadoresParaFiltrar.filter((academico) =>
        this.jogadoresEnfrentados.some(
          (enfrentado) => enfrentado.username === academico.username
        )
      );
    }

    // Atualiza a lista filtrada com os jogadores que passaram nos filtros
    this.filteredJogadores = jogadoresParaFiltrar;
  }

  filtrarJogadoresEnfrentados() {
    // Esse método agora apenas vai filtrar a lista de acadêmicos com base nos jogadores enfrentados
    // if (this.jogadoresEnfrentados.length > 0) {
    //   this.filteredJogadores = this.academicos.filter((academico) =>
    //     this.jogadoresEnfrentados.some(
    //       (enfrentado) => enfrentado.username === academico.username
    //     )
    //   );
    // } else {
    //   // Caso não haja jogadores enfrentados, exibe todos os acadêmicos
    //   this.filteredJogadores = [...this.academicos];
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['searchedJogadores'] &&
      this.searchedJogadores !== changes['searchedJogadores'].previousValue
    ) {
      this.filterJogadores(); // Aplica o filtro quando houver alteração no valor da pesquisa
    }
  }

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
                this.jogadoresEnfrentados = response.content; // Atualiza os jogadores enfrentados
                this.totalJogadoresEnfrentados = response.totalElements || 0;
                this.filtrarJogadoresEnfrentados(); // Aplica o filtro após atualizar a lista
              } else {
                this.jogadoresEnfrentados = [];
                this.totalJogadoresEnfrentados = 0;
                this.filtrarJogadoresEnfrentados();
                this.isBlocked = true; // Marca o usuário como bloqueado quando não há jogadores enfrentados
                this.mensagem = 'Você não tem jogadores enfrentados.';
                this.mensagem_detalhes =
                  'Nenhum jogador foi encontrado para este usuário.';
              }
            }
          },
          error: (err) => {
            // Para outros erros, você mantém a lógica de mensagem de erro
            this.mensagem = 'Erro buscando jogadores enfrentados';
            this.mensagem_detalhes = `[${err.status} ${err.message}]`;
          },
        });
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
    this.getUsuarios();
  }

  navigateToPerfil(academico: Academico): void {
    this.router.navigate(['/perfil-outro-usuario', academico.username]);
  }

  // Chama o serviço para obter as estatísticas por modalidade
  getEstatisticas(academicoId: number, modalidadeId: number | null): void {
    if (modalidadeId) {
      this.academicoService
        .getEstatisticasPorModalidade(academicoId, modalidadeId)
        .subscribe({
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
        modalidade: 'Sem Modalidade', // Valor padrão para modalidade
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
  getEstatisticasDoAcademico(
    academicoId: number
  ): EstatisticaModalidade | undefined {
    return this.estatisticasMap.get(academicoId);
  }
}
