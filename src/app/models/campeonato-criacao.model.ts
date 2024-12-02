import { Endereco } from './endereco.model';
export class CampeonatoCriacao {
  titulo: string = '';
  descricao: string = '';
  senha: string = '';
  aposta: string = '';
  dataInicio: string = '';
  dataFim: string = '';
  limiteTimes: number | null = null;
  limiteParticipantes: number | null = null;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();

  privacidadeCampeonato: string = '';
  idAcademico: number = 0;
  idModalidadeEsportiva: number = 0;
  situacaoCampeonato: string = '';
}
