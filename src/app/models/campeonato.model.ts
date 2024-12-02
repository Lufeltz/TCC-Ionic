import { Endereco } from './endereco.model';

export class Campeonato {
  idCampeonato: number = 0;
  codigo: string = '';
  senha: string = '';
  titulo: string = '';
  descricao: string = '';
  aposta: string = '';
  dataCriacao: Date = new Date();
  dataInicio: string = '';
  dataFim: string = '';
  limiteTimes: number = 0;
  limiteParticipantes: number | null = null;
  ativo: boolean = true;
  usernameCriador: string = '';
  endereco: Endereco = new Endereco();

  privacidadeCampeonato: string = '';
  idAcademico: number = 0;
  idModalidadeEsportiva: number = 0;
  situacaoCampeonato: string = '';
}
