import { Usuario } from './usuario.model';

export class Publicacao {
  idPublicacao: number = 0;
  titulo: string = '';
  descricao: string = '';
  dataPublicacao: null = null;
  idCanal: number = 1;
  idModalidadeEsportiva: null = null;
  Usuario: Usuario = new Usuario();
}
