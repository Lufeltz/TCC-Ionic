import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonButton, IonToast, IonContent } from '@ionic/angular/standalone';
import {
  Crown,
  Flag,
  LucideAngularModule,
  SquarePen,
  User,
  Users,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { Campeonato } from 'src/app/models/campeonato.model';
import { JogadorResponse } from 'src/app/models/jogador-response.model';
import { Partida } from 'src/app/models/partida.model';
import { Time } from 'src/app/models/time.model';
import { AuthService } from 'src/app/services/auth.service';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { PartidaService } from 'src/app/services/partida.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-campeonato-status',
  templateUrl: './campeonato-status.component.html',
  styleUrls: ['./campeonato-status.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    CommonModule,
    LucideAngularModule,
    FormsModule,
    IonToast,
    IonContent,
  ],
})
export class CampeonatoStatusComponent implements OnInit {
  constructor(
    private campeonatoService: CampeonatoService,
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private authService: AuthService,
    private stateService: StateService
  ) {}

  times: Time[] = [];
  mapaTimes: Map<number, string> = new Map();

  codigo: string = '';
  loading: boolean = true;
  campeonato: Campeonato | null = null;
  partidas: Partida[] = [];
  partida: Partida | null = null;

  idCampeonato!: number;
  size: number = 0;
  usuarioLogado: Academico | null = null;

  vencedorNome: string | null = null;

  isCampeonatoIniciado: boolean = false;

  readonly SquarePen = SquarePen;
  readonly Flag = Flag;
  readonly Users = Users;
  readonly User = User;
  readonly Crown = Crown;

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();
    this.route.paramMap.subscribe((params) => {
      this.codigo = params.get('codigo')!;
      this.buscarCampeonatoPorCodigo(this.codigo);
    });
  }

  formatarSituacaoCampeonato(situacao: string): string {
    return situacao
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  hasVencedor(): boolean {
    const finalPartida = this.getEtapa('FINAL')[0];
    if (finalPartida && finalPartida.resultado) {
      const idVencedor =
        finalPartida.resultado.pontuacaoTime1 >
        finalPartida.resultado.pontuacaoTime2
          ? finalPartida.idTime1
          : finalPartida.resultado.pontuacaoTime2 >
            finalPartida.resultado.pontuacaoTime1
          ? finalPartida.idTime2
          : null;

      if (idVencedor) {
        this.vencedorNome = this.mapaTimes.get(idVencedor) || 'Desconhecido';
        return true;
      }
    }
    return false;
  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  }

  salvarResultado(partida: Partida) {
    this.partidaService.salvarPontuacao(partida).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Erro ao salvar resultado:', error);
      },
    });
  }

  iniciarPrimeiraFase() {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.partidaService
        .iniciarPrimeiraFase(this.campeonato.idCampeonato)
        .subscribe({
          next: (response) => {
            console.log('Primeira fase iniciada');
            this.isCampeonatoIniciado = true;
            this.buscarCampeonatoPorCodigo(this.codigo);
            this.stateService.triggerUpdateListagemCampeonatos();
          },
          error: (error) => {
            console.error('Erro ao iniciar primeira fase:', error);
          },
        });
    } else {
      console.error('Campeonato não definido ou ID inválido');
    }
  }

  avancarFase() {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.partidaService.avancarFase(this.campeonato.idCampeonato).subscribe({
        next: (response) => {
          console.log('Fase avançada');
          this.buscarCampeonatoPorCodigo(this.codigo);
          this.stateService.triggerUpdateListagemCampeonatos();
        },
        error: (error) => {
          console.error('Erro ao avançar fase:', error);
        },
      });
    } else {
      console.error('Campeonato não definido ou ID inválido');
    }
  }

  listarPartidas(idCampeonato: number) {
    this.loading = true;
    this.partidaService.listarPartidas(idCampeonato).subscribe({
      next: (partidas) => {
        this.partidas = partidas;
        this.loading = false;
        this.hasVencedor();
      },
      error: (err) => {
        console.error('Erro ao listar partidas:', err);
        this.loading = false;
      },
    });
  }

  listarJogadores(idCampeonato: number): void {
    this.partidaService.listarJogadores(idCampeonato).subscribe({
      next: (response: JogadorResponse) => {
        this.size = response.content.length;
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

          this.mapaTimes = new Map<number, string>();
          this.times.forEach((time) => {
            this.mapaTimes.set(time.idTime, time.nome);
          });
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
          if (
            this.campeonato.situacaoCampeonato === 'INICIADO' ||
            this.campeonato.situacaoCampeonato === 'FINALIZADO'
          ) {
            this.isCampeonatoIniciado = true;
          }

          this.idCampeonato = this.campeonato.idCampeonato;
          this.listarJogadores(this.idCampeonato);
          this.listarTimes();
          this.listarPartidas(this.idCampeonato);
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

  getEtapa(etapa: 'OITAVAS' | 'QUARTAS' | 'SEMI' | 'FINAL') {
    return this.partidas.filter((partida) => partida.fasePartida === etapa);
  }

  shouldShowEtapa(etapa: 'OITAVAS' | 'QUARTAS' | 'SEMI' | 'FINAL') {
    return this.getEtapa(etapa).length > 0;
  }
}
