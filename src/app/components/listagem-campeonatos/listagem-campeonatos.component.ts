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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, lockOpen } from 'ionicons/icons';
import { NgxMaskPipe } from 'ngx-mask';
import { AlertController } from '@ionic/angular';
import {
  LockOpen,
  LucideAngularModule,
  Lock,
  SquareArrowUpRight,
  ExternalLink,
} from 'lucide-angular';
import { Campeonato } from 'src/app/models/campeonato.model';
import { CampeonatoService } from 'src/app/services/campeonato.service';

// interface Endereco {
//   cep: string;
//   uf: string;
//   cidade: string;
//   bairro: string;
//   rua: string;
//   numero: number;
//   complemento: string;
// }

// interface Campeonato {
//   codigo: string;
//   titulo: string;
//   descricao: string;
//   aposta: string;
//   dataCriacao: string;
//   dataInicio: string;
//   dataFim: string;
//   limiteParticipantes: number;
//   status: 'aberto' | 'iniciado' | 'finalizado';
//   endereco: Endereco;
//   privacidadeCampeonato: 'privado' | 'aberto';
// }

@Component({
  selector: 'app-listagem-campeonatos',
  templateUrl: './listagem-campeonatos.component.html',
  styleUrls: ['./listagem-campeonatos.component.scss'],
  imports: [
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
  standalone: true,
})
export class ListagemCampeonatosComponent implements OnInit, OnChanges {
  readonly SquareArrowUpRight = SquareArrowUpRight;
  readonly Lock = Lock;
  readonly LockOpen = LockOpen;
  readonly ExternalLink = ExternalLink;

  // campeonatos: Campeonato[] = [
  //   {
  //     codigo: 'LKM90',
  //     titulo: 'Campeonato de Verão',
  //     descricao: 'Competição anual de verão',
  //     aposta: 'R$ 500,00',
  //     dataCriacao: '2023-01-01',
  //     dataInicio: '2023-02-01',
  //     dataFim: '2023-03-01',
  //     limiteParticipantes: 50,
  //     status: 'aberto',
  //     endereco: {
  //       cep: '12345678',
  //       uf: 'SP',
  //       cidade: 'São Paulo',
  //       bairro: 'Centro',
  //       rua: 'Rua das Flores',
  //       numero: 100,
  //       complemento: 'Próximo ao parque',
  //     },
  //     privacidadeCampeonato: 'aberto',
  //   },
  //   {
  //     codigo: 'HGY86',
  //     titulo: 'Campeonato de Inverno',
  //     descricao: 'Competição anual de inverno',
  //     aposta: 'R$ 1000,00',
  //     dataCriacao: '2023-06-01',
  //     dataInicio: '2023-07-01',
  //     dataFim: '2023-08-01',
  //     limiteParticipantes: 30,
  //     status: 'iniciado',
  //     endereco: {
  //       cep: '87654321',
  //       uf: 'RJ',
  //       cidade: 'Rio de Janeiro',
  //       bairro: 'Copacabana',
  //       rua: 'Avenida Atlântica',
  //       numero: 200,
  //       complemento: 'Em frente à praia',
  //     },
  //     privacidadeCampeonato: 'privado',
  //   },
  //   {
  //     codigo: 'ASH46',
  //     titulo: 'Campeonato de Primavera',
  //     descricao: 'Competição anual de primavera',
  //     aposta: 'R$ 750,00',
  //     dataCriacao: '2023-09-01',
  //     dataInicio: '2023-10-01',
  //     dataFim: '2023-11-01',
  //     limiteParticipantes: 40,
  //     status: 'finalizado',
  //     endereco: {
  //       cep: '11223344',
  //       uf: 'MG',
  //       cidade: 'Belo Horizonte',
  //       bairro: 'Savassi',
  //       rua: 'Rua dos Pioneiros',
  //       numero: 300,
  //       complemento: 'Próximo ao shopping',
  //     },
  //     privacidadeCampeonato: 'aberto',
  //   },
  // ];

  campeonatos: Campeonato[] = [];
  mensagem!: string;
  mensagem_detalhes!: string;

  getIconColor(privacidade: string): string {
    return privacidade === 'privado' ? 'red' : 'green';
  }
  filteredCampeonatos: Campeonato[] = [];

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
  } = {};

  @Input() searchedCampeonatos: string = '';

  constructor(private alertController: AlertController, private campeonatoService: CampeonatoService) {
    addIcons({ lockClosed, lockOpen });
  }

  ngOnInit() {
    // this.filterCampeonatos();
    this.listarCampeonatos()
  }

  
  listarCampeonatos(): Campeonato[] {
    this.campeonatoService.getAllCampeonatos().subscribe({
      next: (data: Campeonato[] | null) => {
        if (data == null) {
          this.campeonatos = [];
        } else {
          this.campeonatos = data;
          console.log(this.campeonatos)
        }
      },
      error: (err) => {
        this.mensagem = 'Erro buscando lista de funcionários';
        this.mensagem_detalhes = `[${err.status} ${err.message}]`;
      },
    });
    return this.campeonatos;
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['statusToggles'] || changes['searchedCampeonatos']) {
  //     this.filterCampeonatos();
  //   }
  // }

  // filterCampeonatos() {
  //   // Definindo valores padrão caso statusToggles não tenha dados
  //   const {
  //     aberto = true,
  //     finalizado = true,
  //     iniciado = true,
  //   } = this.statusToggles;

  //   // Utilizando valor padrão para searchedCampeonatos
  //   const searchTerm = this.searchedCampeonatos.toLowerCase();

  //   this.filteredCampeonatos = this.campeonatos.filter((campeonato) => {
  //     const matchesStatus =
  //       (aberto && campeonato.status === 'aberto') ||
  //       (finalizado && campeonato.status === 'finalizado') ||
  //       (iniciado && campeonato.status === 'iniciado');

  //     const matchesSearchTerm =
  //       campeonato.titulo.toLowerCase().includes(searchTerm) ||
  //       campeonato.descricao.toLowerCase().includes(searchTerm);

  //     return matchesStatus && matchesSearchTerm;
  //   });
  // }

  async presentAlertPrompt(campeonato: Campeonato, errorMessage: string = '') {
    const alert = await this.alertController.create({
      header: 'Insira a senha',
      message: errorMessage, // Mensagem de erro
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

  // inscreverSe(campeonato: Campeonato) {
  //   if (campeonato.privacidadeCampeonato === 'privado') {
  //     this.presentAlertPrompt(campeonato);
  //   } else {
  //     console.log('Você entrou no campeonato:', campeonato.titulo);
  //   }
  // }
}
