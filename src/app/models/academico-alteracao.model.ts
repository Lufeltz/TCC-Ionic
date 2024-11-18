export class AcademicoAlteracao {
  curso: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  nome: string = '';
  genero: string = '';
  telefone: string = ''; // Sem formatação
  dataNascimento: string = ''; // Formato ISO 8601: "YYYY-MM-DDTHH:mm:ss.sssZ"
  foto: string | null = null;
  ativo: boolean = false;
}
