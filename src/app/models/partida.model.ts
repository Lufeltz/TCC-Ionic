// Modelo para o resultado da partida
export class Resultado {
  id: number = 0;
  idVencedor: number | null = 0;
  pontuacaoTime1: number = 0;
  pontuacaoTime2: number = 0;
  descricao: string | null = '';
}

// Modelo para a partida
export class Partida {
  idPartida: number = 0;
  dataPartida: string | null = '';
  idCampeonato: number = 0;
  fasePartida: string = '';
  idTime1: number = 0;
  idTime2: number = 0;
  situacaoPartida: string = '';
  resultado: Resultado | null = null;
}
