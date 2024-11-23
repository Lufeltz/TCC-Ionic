import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Ellipsis,
  ExternalLink,
  LucideAngularModule,
  SquarePen,
  User,
  Users,
} from 'lucide-angular';

import {
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { Campeonato } from 'src/app/models/campeonato.model';
import { CriarTime } from 'src/app/models/criar-time.model';
import { ModalCriarTimeComponent } from '../modal-criar-time/modal-criar-time.component';
import { PartidaService } from 'src/app/services/partida.service';
import { Jogador } from 'src/app/models/jogador.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';
import { Time } from 'src/app/models/time.model';
import { Academico } from 'src/app/models/academico.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-campeonato-acoes',
  templateUrl: './campeonato-acoes.component.html',
  styleUrls: ['./campeonato-acoes.component.scss'],
  imports: [
    IonToast,
    IonInput,
    IonButton,
    IonLabel,
    CommonModule,
    FormsModule,
    LucideAngularModule,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    ModalCriarTimeComponent,
  ],
  standalone: true,
})
export class CampeonatoAcoesComponent implements OnInit {
  times: any[] = [];

  codigo: string = '';
  loading: boolean = true;
  campeonato: Campeonato | null = null;
  jogadoresPorTime: { [key: number]: Jogador[] } = {};

  public usuarioLogado: Academico | null = null;

  readonly ExternalLink = ExternalLink;
  readonly User = User;
  readonly Users = Users;
  readonly Ellipsis = Ellipsis;
  readonly SquarePen = SquarePen;

  menuVisible: boolean = false;

  // Modal meta diaria
  modalEditarVisivel: boolean = false;
  idCampeonato!: number;

  criarTime() {

    // console.log(this.idCampeonato, this.usuarioLogado!.idAcademico)
    this.partidaService
      .criarTimeIndividual(this.idCampeonato, this.usuarioLogado!.idAcademico)
      .subscribe({
        next: (response) => {
          console.log('Time inscrito com sucesso:', response);
        },
        error: (err) => {
          console.error('Erro ao inscrever o time:', err);
        },
      });
  }

  toggleMenu() {
    console.log('Menu de opções aberto!'); // Isso será exibido no console ao clicar no '...'
    this.menuVisible = !this.menuVisible;
  }

  sairDoCampeonato() {
    console.log('Saindo do campeonato...');
    // Implementar lógica de saída
    this.menuVisible = false;
  }

  deletarCampeonato() {
    console.log('Deletando campeonato...');
    // Implementar lógica de deletação
    this.menuVisible = false;
  }

  constructor(
    private route: ActivatedRoute,
    private campeonatoService: CampeonatoService,
    private partidaService: PartidaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();
    if (this.usuarioLogado) {
      // this.listarPosts();
    } else {
      console.error('Usuário não logado');
    }

    this.route.paramMap.subscribe((params) => {
      this.codigo = params.get('codigo')!;
      // console.log(this.codigo); // Você pode usar o código aqui para buscar os detalhes do campeonato
      this.buscarCampeonatoPorCodigo(this.codigo);
    });
  }

  navegarParaPerfil(username: string) {
    this.router.navigate([`/homepage/perfil-outro-usuario`, username]);
  }

  adicionarUsuario(idUsuario: number, time: Time) {
    // console.log("idusuario: ", idUsuario)
    // console.log("time: ", time);
    
    this.partidaService.adicionarUsuarioAoTime(idUsuario, time).subscribe({
      next: (response) => {
        console.log('Usuário adicionado ao time:', response);
      },
      error: (error) => {
        console.error('Erro ao adicionar usuário ao time:', error);
      },
    });
  }

  listarJogadores() {
    this.partidaService
      .listarJogadores(this.campeonato!.idCampeonato)
      .subscribe({
        next: (resposta) => {
          if (resposta && resposta.content && Array.isArray(resposta.content)) {
            this.jogadoresPorTime = resposta.content.reduce(
              (acc: { [key: number]: Jogador[] }, jogador: Jogador) => {
                const { idTime } = jogador;
                if (!acc[idTime]) {
                  acc[idTime] = [];
                }
                acc[idTime].push(jogador);
                return acc;
              },
              {}
            );
            console.log('Jogadores por Time:', this.jogadoresPorTime);
          } else {
            console.error(
              'A resposta não contém o array "content" esperado ou a estrutura está incorreta.'
            );
          }
        },
        error: (err) => {
          console.error('Erro ao listar jogadores:', err);
        },
      });
  }

  // Método para listar os times
  listarTimes() {
    if (this.idCampeonato) {
      this.partidaService.listarTimes(this.idCampeonato).subscribe({
        next: (times) => {
          this.times = times;
          console.log('Times:', this.times);
        },
        error: (err) => {
          console.error('Erro ao listar times:', err);
        },
      });
    } else {
      console.error('ID do Campeonato não definido!');
    }
  }

  // Método para buscar campeonato por código
  buscarCampeonatoPorCodigo(codigo: string): void {
    this.loading = true; // Define loading como true no início da requisição
    this.campeonatoService.filtrarCampeonatos(codigo).subscribe({
      next: (campeonatos) => {
        if (campeonatos && campeonatos.length > 0) {
          this.campeonato = campeonatos[0]; // Salva o primeiro campeonato na variável campeonato
          console.log('Campeonato encontrado nas ações:', this.campeonato);
          console.log('ID do Campeonato:', this.campeonato.idCampeonato); // Log para verificar o ID do campeonato

          // Agora que temos o ID do campeonato, podemos listar os times e jogadores
          this.idCampeonato = this.campeonato.idCampeonato; // Atribui o ID do campeonato à variável idCampeonato
          this.listarTimes(); // Chama listarTimes após obter o ID
          this.listarJogadores(); // Chama listarJogadores após obter o ID
        } else {
          this.campeonato = null; // Caso não encontre o campeonato
          console.warn('Campeonato não encontrado');
        }
        this.loading = false; // Define loading como false após a requisição ser concluída
      },
      error: (err) => {
        console.error('Erro ao buscar campeonato:', err);
        this.loading = false; // Define loading como false caso ocorra um erro na requisição
      },
    });
  }

  abrirModalEditar() {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.idCampeonato = this.campeonato.idCampeonato;
      console.log('Abrindo modal com idCampeonato:', this.idCampeonato); // Verifique o valor
      this.modalEditarVisivel = true;
    } else {
      console.warn('Campeonato não encontrado ou idCampeonato inválido.');
    }
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }

  // Este método pode ser expandido se necessário para lidar com a seleção do time
  onSelectChange(event: any) {
    console.log('Time selecionado:', event.target.value);
  }
}
