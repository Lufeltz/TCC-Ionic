import { Endereco } from './endereco.model';
export class CampeonatoCriacao {
  titulo: string = '';
  descricao: string = '';
  senha: string = '';
  aposta: string = '';
  dataInicio: string = '2024-10-01T09:00:00Z';
  dataFim: string = '2024-10-25T18:00:00Z';
  limiteTimes: number | null = null;
  limiteParticipantes: number | null = null;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();

  privacidadeCampeonato: string = 'PRIVADO';
  idAcademico: number = 0;
  idModalidadeEsportiva: number = 0;
  situacaoCampeonato: string = 'EM_ABERTO';
}
