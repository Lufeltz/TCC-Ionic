export class Academico {
  idAcademico: number = 0;
  curso: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  nome: string = '';
  genero: string = '';
  telefone: string = '';
  dataNascimento: string = '';
  foto: string = '';
  dataCriacao: string = '';
  ativo: boolean = true;
  permissao: string = '';
  modalidades: { idModalidade: number; nomeModalidade: string }[] = [];
}
