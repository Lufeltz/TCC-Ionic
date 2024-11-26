import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-campeonato-status',
  templateUrl: './campeonato-status.component.html',
  styleUrls: ['./campeonato-status.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, LucideAngularModule, FormsModule],
})
export class CampeonatoStatusComponent implements OnInit {
  times: Time[] = []; // Array para armazenar os times
  mapaTimes: Map<number, string> = new Map(); // Mapa para associar idTime ao nome do time

  readonly SquarePen = SquarePen;
  readonly Flag = Flag;
  readonly Users = Users;
  readonly User = User;
  readonly Crown = Crown;

  codigo: string = '';
  loading: boolean = true;
  campeonato: Campeonato | null = null;
  partidas: Partida[] = [];
  partida: Partida | null = null;

  idCampeonato!: number;
  size: number = 0;
  usuarioLogado: Academico | null = null;

  vencedorNome: string | null = null;

  isCampeonatoIniciado: boolean = false; // Variável de estado para indicar se o campeonato foi iniciado

  constructor(
    private campeonatoService: CampeonatoService,
    private route: ActivatedRoute,
    private partidaService: PartidaService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.codigo = params.get('codigo')!;
      console.log(this.codigo); // Use o código para buscar detalhes do campeonato
      this.buscarCampeonatoPorCodigo(this.codigo);
    });
  }


  formatarSituacaoCampeonato(situacao: string): string {
    // Substitui os underscores por espaços e capitaliza a primeira letra de cada palavra
    return situacao
      .toLowerCase() // Converte toda a string para minúsculas
      .replace(/_/g, ' ') // Substitui os underscores por espaços
      .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitaliza a primeira letra de cada palavra
  }
  
  // Função para verificar se a partida final foi concluída e tem um vencedor
  hasVencedor(): boolean {
    const finalPartida = this.getEtapa('FINAL')[0]; // Obtemos a primeira partida da final
    if (finalPartida && finalPartida.resultado) {
      // Verifica se a partida tem resultado e um vencedor
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
        return true; // Vencedor encontrado
      }
    }
    return false; // Não há vencedor ainda
  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement; // Casting para garantir que seja um HTMLInputElement
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  }

  salvarResultado(partida: Partida) {
    this.partidaService.salvarPontuacao(partida).subscribe({
      next: (response) => {
        console.log('Resultado salvo com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao salvar resultado:', error);
      },
    });
  }

  // Função para iniciar a primeira fase do campeonato
  iniciarPrimeiraFase() {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.partidaService
        .iniciarPrimeiraFase(this.campeonato.idCampeonato)
        .subscribe({
          next: (response) => {
            console.log('Primeira fase iniciada');
            this.isCampeonatoIniciado = true; // Atualiza o estado para "Campeonato Iniciado"
          },
          error: (error) => {
            console.error('Erro ao iniciar primeira fase:', error);
          },
        });
    } else {
      console.error('Campeonato não definido ou ID inválido');
    }
  }

  // Função para avançar a fase do campeonato
  avancarFase() {
    if (this.campeonato && this.campeonato.idCampeonato) {
      this.partidaService.avancarFase(this.campeonato.idCampeonato).subscribe({
        next: (response) => {
          console.log('Fase avançada');
        },
        error: (error) => {
          console.error('Erro ao avançar fase:', error);
        },
      });
    } else {
      console.error('Campeonato não definido ou ID inválido');
    }
  }

  // Função para listar as partidas
  listarPartidas(idCampeonato: number) {
    this.loading = true;
    this.partidaService.listarPartidas(idCampeonato).subscribe({
      next: (partidas) => {
        this.partidas = partidas;
        this.loading = false;
        console.log(this.partidas);

        // Verificar vencedor após carregar as partidas
        this.hasVencedor(); // Atualiza o nome do vencedor, se houver
      },
      error: (err) => {
        console.error('Erro ao listar partidas:', err);
        this.loading = false;
      },
    });
  }

  // Função para listar os jogadores
  listarJogadores(idCampeonato: number): void {
    this.partidaService.listarJogadores(idCampeonato).subscribe({
      next: (response: JogadorResponse) => {
        this.size = response.content.length;
        console.log('Tamanho da resposta:', this.size);
      },
      error: (err) => {
        console.error('Erro ao listar jogadores:', err);
      },
    });
  }

  // Função para listar os times e atualizar o mapa de times
  listarTimes() {
    if (this.idCampeonato) {
      this.partidaService.listarTimes(this.idCampeonato).subscribe({
        next: (times) => {
          this.times = times;
          console.log('Times:', this.times);

          // Atualiza o mapa de idTime -> nome
          this.mapaTimes = new Map<number, string>();
          this.times.forEach((time) => {
            this.mapaTimes.set(time.idTime, time.nome);
          });

          console.log(this.mapaTimes);
        },
        error: (err) => {
          console.error('Erro ao listar times:', err);
        },
      });
    } else {
      console.error('ID do Campeonato não definido!');
    }
  }

  // Função para buscar campeonato por código
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
          console.log('Campeonato encontrado:', this.campeonato);

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

  // Função para obter partidas por etapa
  getEtapa(etapa: 'OITAVAS' | 'QUARTAS' | 'SEMI' | 'FINAL') {
    return this.partidas.filter((partida) => partida.fasePartida === etapa);
  }

  // Função para verificar se uma etapa deve ser exibida
  shouldShowEtapa(etapa: 'OITAVAS' | 'QUARTAS' | 'SEMI' | 'FINAL') {
    return this.getEtapa(etapa).length > 0;
  }
}
