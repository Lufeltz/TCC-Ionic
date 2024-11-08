import { Usuario } from './usuario.model';

export class Post {
  idPublicacao: number = 0;
  titulo: string = '';
  descricao: string = '';
  dataPublicacao: string = '';
  idCanal: number = 0;
  idModalidadeEsportiva: number | null = 0;
  usuario: Usuario = new Usuario();
  listaUsuarioCurtida: Usuario[] = [];
}
