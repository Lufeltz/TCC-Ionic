import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Publicacao } from '../models/publicacao.model';

@Injectable({
  providedIn: 'root',
})
export class PublicacaoService {
  constructor(private _http: HttpClient) {}

  private readonly NEW_URL = 'http://localhost:8081';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Método POST
  postPublicacao(publicacao: Publicacao): Observable<Publicacao | null> {
    return this._http
      .post<Publicacao>(
        `${this.NEW_URL}/publicacao/cadastrarPublicacao`, // Atualizando a URL
        JSON.stringify(publicacao),
        this.httpOptions
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
        this.httpOptions
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
      .delete<Publicacao>(`${this.NEW_URL}/aeroportos/${id}`, this.httpOptions)
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
        this.httpOptions
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
        this.httpOptions
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
