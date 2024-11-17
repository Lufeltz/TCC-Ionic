import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campeonato-status',
  templateUrl: './campeonato-status.component.html',
  styleUrls: ['./campeonato-status.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CampeonatoStatusComponent implements OnInit {
  times: any[] = [
    { numero: 'Time 1', jogadores: ['Jogador 1', 'Jogador 2', 'Jogador 3'] },
    { numero: 'Time 2', jogadores: ['Jogador A', 'Jogador B', 'Jogador C'] },
    { numero: 'Time 3', jogadores: ['Jogador X', 'Jogador Y', 'Jogador Z'] },
    { numero: 'Time 4', jogadores: ['Jogador 4', 'Jogador 5', 'Jogador 6'] },
    { numero: 'Time 5', jogadores: ['Jogador D', 'Jogador E', 'Jogador F'] },
    { numero: 'Time 6', jogadores: ['Jogador M', 'Jogador N', 'Jogador O'] },
    { numero: 'Time 7', jogadores: ['Jogador P', 'Jogador Q', 'Jogador R'] },
    { numero: 'Time 8', jogadores: ['Jogador S', 'Jogador T', 'Jogador U'] },
    { numero: 'Time 9', jogadores: ['Jogador 7', 'Jogador 8', 'Jogador 9'] },
    { numero: 'Time 10', jogadores: ['Jogador V', 'Jogador W', 'Jogador X'] },
    { numero: 'Time 11', jogadores: ['Jogador Y', 'Jogador Z', 'Jogador AA'] },
    { numero: 'Time 12', jogadores: ['Jogador BB', 'Jogador CC', 'Jogador DD'] },
    { numero: 'Time 13', jogadores: ['Jogador EE', 'Jogador FF', 'Jogador GG'] },
    { numero: 'Time 14', jogadores: ['Jogador HH', 'Jogador II', 'Jogador JJ'] },
    { numero: 'Time 15', jogadores: ['Jogador KK', 'Jogador LL', 'Jogador MM'] },
    { numero: 'Time 16', jogadores: ['Jogador NN', 'Jogador OO', 'Jogador PP'] },
  ];

  constructor() {}

  ngOnInit() {}

  getEtapa(etapa: '8 de final' | '4 de final' | 'semifinal' | 'final') {
    const etapas: { [key in '8 de final' | '4 de final' | 'semifinal' | 'final']: { start: number; end: number } } = {
      '8 de final': { start: 0, end: 8 },
      '4 de final': { start: 8, end: 12 },
      'semifinal': { start: 12, end: 14 },
      'final': { start: 14, end: 16 },
    };

    // Verificar qual etapa é válida
    const validEtapas = {
      '8 de final': this.times.length >= 16,
      '4 de final': this.times.length >= 8,
      'semifinal': this.times.length >= 4,
      'final': this.times.length >= 2,
    };

    // Se a etapa não for válida, retornar um array vazio
    if (!validEtapas[etapa]) {
      return [];
    }

    const currentEtapa = etapas[etapa];
    const times = this.times.slice(currentEtapa.start, currentEtapa.end);

    // Agrupar times em pares
    const pairedTimes = [];
    for (let i = 0; i < times.length; i += 2) {
      pairedTimes.push(times.slice(i, i + 2));
    }
    return pairedTimes;
  }

  shouldShowEtapa(etapa: '8 de final' | '4 de final' | 'semifinal' | 'final'): boolean {
    const etapasVisibility = {
      '8 de final': this.times.length >= 16,
      '4 de final': this.times.length >= 8,
      'semifinal': this.times.length >= 4,
      'final': this.times.length >= 2,
    };

    return etapasVisibility[etapa];
  }
}
