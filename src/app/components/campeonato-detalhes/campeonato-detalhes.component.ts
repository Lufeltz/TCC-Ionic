import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {
  LockOpen,
  LucideAngularModule,
  Lock,
  SquareArrowUpRight,
  ExternalLink,
  RotateCw,
  Users,
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
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { Campeonato } from 'src/app/models/campeonato.model';
import { ModalidadeEsportiva } from 'src/app/models/modalidades.model';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { TitleCasePipe } from 'src/app/pipes/title-case.pipe';
import { NgxMaskPipe } from 'ngx-mask';
@Component({
  selector: 'app-campeonato-detalhes',
  templateUrl: './campeonato-detalhes.component.html',
  standalone: true,
  styleUrls: ['./campeonato-detalhes.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPerfilComponent,
    LucideAngularModule,
    TitleCasePipe,
    NgxMaskPipe,
  ],
})
export class CampeonatoDetalhesComponent implements OnInit, OnChanges {
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

  campeonatos: Campeonato[] = [];
  modalidades: ModalidadeEsportiva[] = []; // Armazena a lista de modalidades
  modalidadesSimplificadas: { idModalidadeEsportiva: number; nome: string }[] =
    []; // Variável para armazenar o novo array

      campeonatos2: Campeonato[] = [
    {
      idCampeonato: 4,
      codigo: '#XPCQY4',
      titulo: 'pingas de Rua',
      descricao: 'Melhor da cidade',
      aposta: 'Medalhas e troféus',
      senha: '',
      dataCriacao: new Date('2024-11-16T18:25:17Z'),
      dataInicio: '2024-10-01T09:00:00Z',
      dataFim: '2024-10-25T18:00:00Z',
      limiteTimes: 10,
      limiteParticipantes: 1,
      ativo: true,
      endereco: {
        cep: '80030000',
        uf: 'PR',
        cidade: 'Curitiba',
        bairro: 'Alto da Glória',
        rua: 'Rua Mateus Leme',
        numero: 789,
        complemento: null,
      },
      privacidadeCampeonato: 'PUBLICO',
      idAcademico: 2,
      idModalidadeEsportiva: 5,
      situacaoCampeonato: 'FINALIZADO',
    },
  ];

  mensagem!: string;
  mensagem_detalhes!: string;
  loading: boolean = true;
  filteredCampeonatos: Campeonato[] = [];
  academico: Academico | null = null; // Variável para armazenar os dados do acadêmico logado

  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
    participando?: boolean; // Ensure this is a boolean value
  } = { participando: true };

  @Input() searchedCampeonatos: string = '';

  constructor(
    private campeonatoService: CampeonatoService,
    private alertController: AlertController,
    private modalidadeService: ModalidadesService
  ) {}

  getLockColor(privacidade: string): string {
    return privacidade === 'PRIVADO'
      ? 'var(--light-red)'
      : 'var(--text-new-green)'; // 'red' para 'privado', 'green' para 'público'
  }

  ngOnInit() {
    this.loadModalidades();
    this.listarCampeonatos();
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

  listarCampeonatos(): void {
    this.campeonatoService
      .getAllCampeonatos(this.currentPage, this.pageSize)
      .subscribe({
        next: (data: any) => {
          this.loading = false; // Define loading como falso quando os dados são recebidos
          if (data.content == null) {
            this.campeonatos = [];
          } else {
            if (this.currentPage === 0) {
              this.campeonatos = data.content;
            } else {
              this.campeonatos = [...this.campeonatos, ...data.content]; // Concatenando os novos dados
            }
            this.totalPages = data.totalPages;
          }
        },
        error: (err) => {
          this.loading = false; // Define loading como falso em caso de erro
          this.mensagem = 'Erro buscando lista de campeonatos';
          this.mensagem_detalhes = `[${err.status} ${err.message}]`;
        },
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Implementar se necessário
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
