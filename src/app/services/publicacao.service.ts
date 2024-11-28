import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Publicacao } from '../models/publicacao.model';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token
import { APP_CONFIG } from './host';

@Injectable({
  providedIn: 'root',
})
export class PublicacaoService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  private ip: string = APP_CONFIG.ip;

  private readonly NEW_URL = `http://${this.ip}:8081`;

  // Função para obter o token e adicionar ao cabeçalho
  private getHttpOptions() {
    const token = this.authService.getToken(); // Obtém o token do AuthService
    const headers = token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho Authorization
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return {
      headers: headers,
      observe: 'response' as 'response',
    };
  }

  filtrarPublicacoes(searchTerm: string): Observable<any[]> {
    return this._http
      .get<any>(
        `${this.NEW_URL}/publicacao/1/buscar-publicacoes-username/${searchTerm}?page=0&size=10&sort=dataPublicacao,desc`,
        this.getHttpOptions()
      )
      .pipe(
        map((response) => {
          // Verifica se o body existe e se contém a chave 'content' que é um array
          if (
            response &&
            response.body &&
            Array.isArray(response.body.content)
          ) {
            return response.body.content; // Retorna o array de publicações
          } else {
            console.error(
              'Esperado um array em "content", mas a resposta é:',
              response
            );
            return []; // Retorna um array vazio em caso de erro
          }
        }),
        catchError((err) => {
          console.error('Erro ao filtrar publicações', err);
          return throwError(() => err); // Trata erros
        })
      );
  }

  // Método POST
  postPublicacao(publicacao: Publicacao): Observable<Publicacao | null> {
    return this._http
      .post<Publicacao>(
        `${this.NEW_URL}/publicacao/cadastrarPublicacao`, // Atualizando a URL
        JSON.stringify(publicacao),
        this.getHttpOptions() // Usa getHttpOptions para incluir o token
      )
      .pipe(
        map((resp: HttpResponse<Publicacao>) => {
          // Verificação do status HTTP
          if (resp.status === 201 && resp.body) {
            return resp.body; // Retorna o corpo da resposta se o status for 201
          } else {
            return null; // Caso não tenha sido criado ou se o corpo for nulo
          }
        }),
        catchError((err) => {
          return throwError(() => err); // Retorna o erro em caso de falha
        })
      );
  }

  // Método PUT
  putPublicacao(publicacao: Publicacao): Observable<Publicacao | null> {
    return this._http
      .put<Publicacao>(
        `${this.NEW_URL}/campeonatos/${publicacao.idPublicacao}`,
        JSON.stringify(publicacao),
        this.getHttpOptions() // Usa getHttpOptions para incluir o token
      )
      .pipe(
        map((resp: HttpResponse<Publicacao>) => {
          // Verificação do status HTTP
          if (resp.status === 200 && resp.body) {
            return resp.body; // Retorna o corpo da resposta
          } else {
            return null; // Caso não tenha sido atualizado ou se body for nulo
          }
        }),
        catchError((err) => {
          return throwError(() => err); // Retorna o erro em caso de falha
        })
      );
  }

  // Método DELETE
  deletePublicacao(id: string): Observable<Publicacao | null> {
    return this._http
      .delete<Publicacao>(
        `${this.NEW_URL}/aeroportos/${id}`,
        this.getHttpOptions() // Usa getHttpOptions para incluir o token
      )
      .pipe(
        map((resp: HttpResponse<Publicacao>) => {
          // Verificação do status HTTP
          if (resp.status === 200 && resp.body) {
            return resp.body; // Retorna o corpo da resposta
          } else {
            return null; // Caso não tenha sido deletado ou se body for nulo
          }
        }),
        catchError((err) => {
          return throwError(() => err); // Retorna o erro em caso de falha
        })
      );
  }

  // Método para curtir uma publicação
  curtirPublicacao(userId: number, publicacaoId: number): Observable<any> {
    return this._http
      .post<any>(
        `${this.NEW_URL}/publicacao/curtirPublicacao/${userId}/${publicacaoId}`,
        {},
        this.getHttpOptions() // Usa getHttpOptions para incluir o token
      )
      .pipe(
        map((resp: HttpResponse<any>) => {
          if (resp.status === 200 && resp.body) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  // Método para remover a curtida de uma publicação
  removerCurtidaPublicacao(
    userId: number,
    publicacaoId: number
  ): Observable<any> {
    return this._http
      .delete<any>(
        `${this.NEW_URL}/publicacao/removerCurtidaPublicacao/${userId}/${publicacaoId}`,
        this.getHttpOptions() // Usa getHttpOptions para incluir o token
      )
      .pipe(
        map((resp: HttpResponse<any>) => {
          if (resp.status === 200 && resp.body) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
