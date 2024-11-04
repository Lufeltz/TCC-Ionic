import { Endereco } from './endereco.model';

export class Campeonato {
  idCampeonato: number = 1;
  codigo: string = '';
  senha: string = '';
  titulo: string = '';
  descricao: string = '';
  aposta: string = '';
  dataCriacao: Date = new Date();
  dataInicio: string = '2024-10-01T09:00:00Z';
  dataFim: string = '2024-10-25T18:00:00Z';
  limiteTimes: number = 0;
  limiteParticipantes: number = 0;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();
}