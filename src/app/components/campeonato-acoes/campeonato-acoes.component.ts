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
import { ModalInscreverSeComponent } from '../modal-inscrever-se/modal-inscrever-se.component';
import { StateService } from 'src/app/services/state.service';

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
    ModalInscreverSeComponent,
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
  modalEditarVisivel: boolean = false;

  idCampeonato!: number;

  menuVisibleInscrever: boolean = false;
  modalEditarVisivelInscrever: boolean = false;

  idUsuario!: number;
  time!: Time;

  public usuarioInscritoNoCampeonato: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private campeonatoService: CampeonatoService,
    private partidaService: PartidaService,
    private authService: AuthService,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();
    if (this.usuarioLogado) {
      this.verificarInscricaoUsuario();
    } else {
      console.error('Usuário não logado');
    }

    this.route.paramMap.subscribe((params) => {
      this.codigo = params.get('codigo')!;
      this.buscarCampeonatoPorCodigo(this.codigo);
    });

    // Inscrevendo-se nos Observables do serviço para atualizar o componente
    this.stateService.updateTimes$.subscribe((times) => {
      this.times = times;
    });

    this.stateService.updateJogadores$.subscribe((jogadoresPorTime) => {
      this.jogadoresPorTime = jogadoresPorTime;
      this.verificarInscricaoUsuario();
    });
  }

  criarTime() {
    this.partidaService
      .criarTimeIndividual(this.idCampeonato, this.usuarioLogado!.idAcademico)
      .subscribe({
        next: (response) => {
          this.stateService.triggerUpdateListagemTimes([...response.times]);
          this.stateService.triggerUpdateListagemJogadores([
            ...response.jogadoresPorTime,
          ]);
        },
        error: (err) => {
          console.error('Erro ao inscrever o time:', err);
        },
      });
  }

  adicionarUsuario(idUsuario: number, time: Time) {
    this.partidaService.adicionarUsuarioAoTime(idUsuario, time).subscribe({
      next: (response) => {
        this.stateService.triggerUpdateListagemJogadores([
          ...response.jogadoresPorTime,
        ]);
        this.stateService.triggerUpdateListagemTimes([...response.times]);
      },
      error: (error) => {
        console.error('Erro ao adicionar usuário ao time:', error);
      },
    });
  }

  verificarInscricaoUsuario() {
    const jogadorInscrito = Object.values(this.jogadoresPorTime).some(
      (jogadores) =>
        jogadores.some(
          (jogador) => jogador.idAcademico === this.usuarioLogado!.idAcademico
        )
    );
    this.usuarioInscritoNoCampeonato = jogadorInscrito;
  }

  navegarParaPerfil(username: string) {
    this.router.navigate([`/homepage/perfil-outro-usuario`, username]);
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

            this.verificarInscricaoUsuario();
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

  listarTimes() {
    if (this.idCampeonato) {
      this.partidaService.listarTimes(this.idCampeonato).subscribe({
        next: (times) => {
          this.times = times;
        },
        error: (err) => {
          console.error('Erro ao listar times:', err);
        },
      });
    } else {
      console.error('ID do Campeonato não definido!');
    }
  }

  buscarCampeonatoPorCodigo(codigo: string): void {
    this.loading = true;
    this.campeonatoService.filtrarCampeonatos(codigo).subscribe({
      next: (campeonatos) => {
        if (campeonatos && campeonatos.length > 0) {
          this.campeonato = campeonatos[0];

          this.idCampeonato = this.campeonato.idCampeonato;
          this.listarTimes();
          this.listarJogadores();
        } else {
          this.campeonato = null;
          console.warn('Campeonato não encontrado');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar campeonato:', err);
        this.loading = false;
      },
    });
  }

  onSelectChange(event: any) {
    // console.log('Time selecionado:', event.target.value);
  }

  abrirModalInscrever(time: Time) {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.idCampeonato = this.campeonato.idCampeonato;

      this.time = time;

      this.idUsuario = this.usuarioLogado!.idAcademico;

      this.modalEditarVisivelInscrever = true;
    } else {
      console.warn('Campeonato não encontrado ou idCampeonato inválido.');
    }
  }

  fecharModalInscrever() {
    this.modalEditarVisivelInscrever = false;
  }

  abrirModalEditar() {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.idCampeonato = this.campeonato.idCampeonato;
      this.modalEditarVisivel = true;
    } else {
      console.warn('Campeonato não encontrado ou idCampeonato inválido.');
    }
  }

  fecharModal() {
    this.modalEditarVisivel = false;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  sairDoCampeonato() {
    this.menuVisible = false;
  }

  deletarCampeonato() {
    this.menuVisible = false;
  }
}
