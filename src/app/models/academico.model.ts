export class Academico {
  idAcademico: number = 0;
  curso: string = 'tads';
  username: string = 'jamessla';
  email: string = 'james@ufpr.br';
  password: string = '';
  nome: string = 'james';
  genero: string = 'masculino';
  telefone: string = '41123455551';
  dataNascimento: string = '2000-05-06T00:00:00Z';
  foto: string = '';
  dataCriacao: string = '2024-11-01T00:07:52Z';
  ativo: boolean = true;
  permissao: string = 'ACADEMICO';
  modalidades: { idModalidade: number; nomeModalidade: string }[] = [];
}
