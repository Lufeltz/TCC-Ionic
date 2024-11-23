import { Endereco } from './endereco.model';

export class Campeonato {
  idCampeonato: number = 1;
  codigo: string = '1111';
  senha: string = '';
  titulo: string = '';
  descricao: string = '';
  aposta: string = '';
  dataCriacao: Date = new Date();
  dataInicio: string = '2024-10-01T09:00:00Z';
  dataFim: string = '2024-10-25T18:00:00Z';
  limiteTimes: number = 0;
  limiteParticipantes: number | null = null;
  ativo: boolean = true;
  usernameCriador: string = ''
  endereco: Endereco = new Endereco();

  privacidadeCampeonato: string = '';
  idAcademico: number = 1;
  idModalidadeEsportiva: number = 1;
  situacaoCampeonato: string = 'EM_ABERTO';
}
