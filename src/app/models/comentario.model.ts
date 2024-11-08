// comentario.model.ts
export class Comentario {
    idComentario: number = 0;
    descricao: string = '';
    dataComentario: Date = new Date();
    idPublicacao: number = 0;
    Usuario: any = {}; // Especifique a estrutura de usuário conforme necessário
    listaUsuarioCurtida: any[] = [];
  }
  