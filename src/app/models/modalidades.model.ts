export class ModalidadeEsportiva {
  idModalidadeEsportiva: number = 0;
  nome: string = '';
  descricao: string = '';
  foto: string | null = null;
  dataCriacao: string = '';
}

export class Modalidades {
  usuarioId: number = 0;
  modalidades: ModalidadeEsportiva[] = [];
}
