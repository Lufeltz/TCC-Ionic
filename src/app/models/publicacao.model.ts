import { Usuario } from "./usuario.model";

export class Publicacao {
    idPublicacao: number = 0;
    titulo: string = '';
    descricao: string = '';
    // dataPublicacao: Date =  new Date();
    dataPublicacao: null = null; // Se não for para enviar uma data
    idCanal: number = 1;
    idModalidadeEsportiva: null = null;
    Usuario: Usuario = new Usuario();
}
