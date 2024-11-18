export class MetaEsportiva {
  idMetaEsportiva: number = 0;
  titulo: string = '';
  descricao: string = '';
  progressoMaximo: number = 0;
  progressoItem: string = '';
  foto: string | null = null;
  ativo: boolean = true;
  idModalidadeEsportiva: number = 0;
}

export class Conquista {
  idConquista: number = 0;
  progressoAtual: number = 0;
  dataConquista: string | null = null;
  conquistado: boolean = false;
  idAcademico: number = 0;
  metaEsportiva: MetaEsportiva = new MetaEsportiva();
}
