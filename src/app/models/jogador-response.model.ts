import { Jogador } from './jogador.model';

export class JogadorResponse {
  totalElements: number = 0;
  totalPages: number = 0;
  first: boolean = false;
  last: boolean = false;
  size: number = 0;
  content: Jogador[] = [];
  number: number = 0;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  } = {
    empty: false,
    sorted: false,
    unsorted: true,
  };
  numberOfElements: number = 0;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  } = {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: false,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  };
  empty: boolean = false;
}
