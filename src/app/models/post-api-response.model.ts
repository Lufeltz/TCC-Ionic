import { Post } from './post.model';

export class PostApiResponse {
  content: Post[] = []; // Aqui armazenamos a lista de posts
  totalElements: number = 0;
  totalPages: number = 0;
  first: boolean = false;
  last: boolean = false;
  size: number = 0;
  number: number = 0;
  numberOfElements: number = 0;
  pageable: any = {}; // O tipo de 'pageable' pode ser melhor especificado, dependendo de sua estrutura
  empty: boolean = false;
}
