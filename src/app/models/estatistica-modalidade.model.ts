export class EstatisticaModalidade {
  modalidade: string = '';
  vitorias: number = 0;
  derrotas: number = 0;
  jogos: number = 0;
  avaliacao: Avaliacao = new Avaliacao();
}

export class Avaliacao {
  media: number = 0.0;
  quantidadeAvaliacoes: number = 0;
}
