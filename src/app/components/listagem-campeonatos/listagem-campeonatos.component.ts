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
  IonToggle,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, lockOpen, thumbsUpSharp } from 'ionicons/icons';
import { NgxMaskPipe } from 'ngx-mask';
import { AlertController } from '@ionic/angular';
import {
  LockOpen,
  LucideAngularModule,
  Lock,
  SquareArrowUpRight,
  ExternalLink,
  RotateCw,
  Users,
  PersonStanding,
  User,
  Volleyball,
  MessageSquareCode,
  Flag,
  MapPin,
  CalendarCheck,
  CalendarArrowUp,
  Calendar,
  CircleDollarSign,
  NotebookText,
  NotebookPen,
  UsersRound,
  ArrowDownToDot,
  UserPlus,
} from 'lucide-angular';
import { Campeonato } from 'src/app/models/campeonato.model';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from 'src/app/pipes/title-case.pipe';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Endereco } from 'src/app/models/endereco.model';
import {
  ModalidadeEsportiva,
  Modalidades,
} from 'src/app/models/modalidades.model';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { Academico } from 'src/app/models/academico.model';
import { RouterModule } from '@angular/router';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { Time } from 'src/app/models/time.model';
import { PartidaService } from 'src/app/services/partida.service';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listagem-campeonatos',
  templateUrl: './listagem-campeonatos.component.html',
  styleUrls: ['./listagem-campeonatos.component.scss'],
  imports: [
    IonSearchbar,
    IonToggle,
    IonIcon,
    IonButton,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    CommonModule,
    NgxMaskPipe,
    LucideAngularModule,
    FormsModule,
    TitleCasePipe,
    RouterModule,
  ],
  standalone: true,
})
export class ListagemCampeonatosComponent implements OnInit {
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
  readonly UserPlus = UserPlus;

  campeonatos: Campeonato[] = [];
  modalidades: ModalidadeEsportiva[] = []; // Armazena a lista de modalidades
  modalidadesSimplificadas: { idModalidadeEsportiva: number; nome: string }[] =
    []; // Variável para armazenar o novo array

  mensagem!: string;
  mensagem_detalhes!: string;
  filteredCampeonatos: Campeonato[] = [];
  academico: Academico | null = null; // Variável para armazenar os dados do acadêmico logado

  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  searchedCampeonatos: string = ''; // Variável que armazenará o valor da pesquisa
  searchSubject: Subject<string> = new Subject<string>();

  loading: boolean = true;
  times: Time[] = [];
  jogadores: Jogador[] = [];
  timesPorCampeonato: { [idCampeonato: number]: Time[] } = {};
  jogadoresPorCampeonato: { [idCampeonato: number]: Jogador[] } = [];
  error: string = ''; // Mensagem de erro
  showLoadMoreButton: boolean = true;

  // Outros métodos e propriedades do componente

  // Método que é chamado sempre que o usuário digita no IonSearchbar

  constructor(
    private alertController: AlertController,
    private campeonatoService: CampeonatoService,
    private modalidadeService: ModalidadesService,
    private partidaService: PartidaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.academico = this.authService.getUser();
    this.loadModalidades();
    this.subscribeToSearch();
    if (this.academico) {
      this.listarCampeonatos();
    }
    // this.listarTimesPorCampeonato(1)
    // this.listarJogadoresPorCampeonato(1)
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
      },
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
      },
    });
  }

  listarCampeonatos(): void {
    this.academico = this.authService.getUser();
    if (this.academico) {
      this.loading = true; // Define loading como verdadeiro enquanto os dados estão sendo carregados

      // Carrega os campeonatos com base na página inicial
      this.campeonatoService
        .getCampeonatosPorModalidadeAcademico(
          this.academico.idAcademico, // Passa o id do acadêmico
          0, // Página inicial (sempre começa do 0)
          this.pageSize, // Tamanho da página
          'dataCriacao,desc' // Ordena pela data de criação (descendente)
        )
        .subscribe({
          next: (data: any) => {
            this.loading = false; // Define loading como falso quando os dados são recebidos

            if (data.content && data.content.length > 0) {
              // Apenas atualiza a lista de campeonatos
              this.campeonatos = data.content;
              this.totalPages = data.totalPages; // Atualiza o número total de páginas
              this.currentPage = 1; // Começa a contagem a partir de 1
            } else {
              console.log('Não há campeonatos disponíveis.');
              this.campeonatos = [];
            }
          },
          error: (err) => {
            this.loading = false; // Define loading como falso em caso de erro
            this.mensagem = 'Erro buscando lista de campeonatos';
            this.mensagem_detalhes = `[${err.status} ${err.message}]`;
          },
        });
    } else {
      console.error('Usuário não logado');
      this.loading = false;
    }
  }

  listarMaisCampeonatos(): void {
    this.academico = this.authService.getUser();
    if (this.academico) {
      if (this.loading) return; // Evita múltiplos carregamentos simultâneos
  
      this.loading = true; // Define loading como verdadeiro enquanto os dados estão sendo carregados
  
      // Carrega mais campeonatos com base na página atual
      this.campeonatoService
        .getCampeonatosPorModalidadeAcademico(
          this.academico.idAcademico, // Passa o id do acadêmico
          this.currentPage, // Página atual
          this.pageSize, // Tamanho da página
          'dataCriacao,desc' // Ordena pela data de criação (descendente)
        )
        .subscribe({
          next: (data: any) => {
            this.loading = false; // Define loading como falso quando os dados são recebidos
  
            if (data.content && data.content.length > 0) {
              // Concatenando os novos campeonatos com os existentes
              this.campeonatos = [...this.campeonatos, ...data.content];
              this.currentPage++; // Atualiza a página para carregar mais campeonatos
              this.totalPages = data.totalPages; // Atualiza o número total de páginas
            } else {
              console.log('Não há mais campeonatos para carregar.');
            }
          },
          error: (err) => {
            this.loading = false; // Define loading como falso em caso de erro
  
            if (err.status === 500) {
              console.log("Erro 500: Não há mais campeonatos para carregar.");
              this.showLoadMoreButton = false; // Esconde o botão
            }
  
            this.mensagem = 'Erro buscando mais campeonatos';
            this.mensagem_detalhes = `[${err.status} ${err.message}]`;
          },
        });
    } else {
      console.error('Usuário não logado');
      this.loading = false;
    }
  }
  

  // listarCampeonatos(): void {
  //   this.campeonatoService
  //     .getAllCampeonatos(this.currentPage, this.pageSize)
  //     .subscribe({
  //       next: (data: any) => {
  //         this.loading = false; // Define loading como falso quando os dados são recebidos
  //         if (data.content == null) {
  //           this.campeonatos = [];
  //         } else {
  //           if (this.currentPage === 0) {
  //             this.campeonatos = data.content;
  //             console.log(this.campeonatos);
  //           } else {
  //             this.campeonatos = [...this.campeonatos, ...data.content]; // Concatenando os novos dados
  //           }

  //           // Chamar os métodos de times e jogadores para cada campeonato
  //           this.campeonatos.forEach(campeonato => {
  //             this.listarTimesPorCampeonato(campeonato.idCampeonato);
  //             this.listarJogadoresPorCampeonato(campeonato.idCampeonato);
  //           });

  //           this.totalPages = data.totalPages;
  //         }
  //       },
  //       error: (err) => {
  //         this.loading = false; // Define loading como falso em caso de erro
  //         this.mensagem = 'Erro buscando lista de campeonatos';
  //         this.mensagem_detalhes = `[${err.status} ${err.message}]`;
  //       },
  //     });
  // }

  // Inscreve-se no subject para debouncing e para realizar a pesquisa
  subscribeToSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(3000), // Espera 3 segundos após a última digitação
        switchMap((searchTerm) => {
          // Verifica se o termo de pesquisa começa com '#'
          if (searchTerm.startsWith('#')) {
            const codigo = searchTerm; // Mantém o termo com '#', não codifica novamente
            return this.campeonatoService.filtrarCampeonatos(codigo, undefined); // Passa o código com '#'
          } else {
            return this.campeonatoService.filtrarCampeonatos(
              undefined,
              searchTerm
            ); // Passa o título
          }
        })
      )
      .subscribe({
        next: (campeonatos) => {
          this.campeonatos = campeonatos || [];
          this.filteredCampeonatos = this.campeonatos;
        },
        error: (err) => {
          console.error('Erro ao buscar campeonatos', err);
        },
      });
  }

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
    participando?: boolean; // Ensure this is a boolean value
  } = { participando: true };

  onSearchInput(event: any): void {
    this.searchedCampeonatos = event.target.value;
    this.searchSubject.next(this.searchedCampeonatos); // Emite o valor para o Subject
  }

  getLockColor(privacidade: string): string {
    return privacidade === 'PRIVADO'
      ? 'var(--light-red)'
      : 'var(--text-new-green)'; // 'red' para 'privado', 'green' para 'público'
  }

  loadModalidades(): void {
    this.modalidadeService.getAllModalidades().subscribe({
      next: (modalidades) => {
        if (modalidades && modalidades.length > 0) {
          this.modalidades = modalidades; // Atribui corretamente um array de ModalidadeEsportiva
          this.gerarModalidadesSimplificadas(); // Chama a função para gerar o array simplificado
        } else {
          console.warn('Nenhuma modalidade encontrada');
          this.modalidades = [];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar modalidades', err);
      },
    });
  }

  gerarModalidadesSimplificadas(): void {
    // Verifica se `this.modalidades` é um array e não está vazio
    if (Array.isArray(this.modalidades) && this.modalidades.length > 0) {
      // Mapeia o array diretamente e extrai o id e nome de cada modalidade
      this.modalidadesSimplificadas = this.modalidades.map((modalidade) => ({
        idModalidadeEsportiva: modalidade.idModalidadeEsportiva,
        nome: modalidade.nome,
      }));
    } else {
      console.warn(
        'A lista de modalidades está vazia ou com formato incorreto'
      );
    }
  }

  getNomeModalidade(id: number): string | undefined {
    // Busca o nome da modalidade no array de modalidades simplificadas
    const modalidade = this.modalidadesSimplificadas.find(
      (mod) => mod.idModalidadeEsportiva === id
    );
    return modalidade ? modalidade.nome : 'Modalidade não encontrada'; // Retorna o nome ou uma mensagem de erro
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.listarCampeonatos();
    }
  }

  async presentAlertPrompt(campeonato: Campeonato, errorMessage: string = '') {
    const alert = await this.alertController.create({
      header: 'Insira a senha',
      message: errorMessage,
      inputs: [
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Senha',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operação cancelada');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            this.verificarSenha(campeonato, data.senha);
          },
        },
      ],
    });

    await alert.present();
  }

  verificarSenha(campeonato: Campeonato, senha: string) {
    const senhaCorreta = 'senha123'; // Defina a senha correta aqui

    if (senha === senhaCorreta) {
      console.log('Você entrou no campeonato:', campeonato.titulo);
    } else {
      this.presentAlertPrompt(campeonato, 'Senha errada. Tente novamente.');
    }
  }
}
