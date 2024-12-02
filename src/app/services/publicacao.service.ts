import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Publicacao } from '../models/publicacao.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicacaoService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  private readonly NEW_URL = 'http://localhost:8081';

  private getHttpOptions() {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
          if (
            response &&
            response.body &&
            Array.isArray(response.body.content)
          ) {
            return response.body.content;
          } else {
            console.error(
              'Esperado um array em "content", mas a resposta é:',
              response
            );
            return [];
          }
        }),
        catchError((err) => {
          console.error('Erro ao filtrar publicações', err);
          return throwError(() => err);
        })
      );
  }

  postPublicacao(publicacao: Publicacao): Observable<Publicacao | null> {
    return this._http
      .post<Publicacao>(
        `${this.NEW_URL}/publicacao/cadastrarPublicacao`,
        JSON.stringify(publicacao),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Publicacao>) => {
          if (resp.status === 201 && resp.body) {
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

  putPublicacao(publicacao: Publicacao): Observable<Publicacao | null> {
    return this._http
      .put<Publicacao>(
        `${this.NEW_URL}/campeonatos/${publicacao.idPublicacao}`,
        JSON.stringify(publicacao),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Publicacao>) => {
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

  deletePublicacao(id: string): Observable<Publicacao | null> {
    return this._http
      .delete<Publicacao>(
        `${this.NEW_URL}/aeroportos/${id}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Publicacao>) => {
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

  curtirPublicacao(userId: number, publicacaoId: number): Observable<any> {
    return this._http
      .post<any>(
        `${this.NEW_URL}/publicacao/curtirPublicacao/${userId}/${publicacaoId}`,
        {},
        this.getHttpOptions()
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

  removerCurtidaPublicacao(
    userId: number,
    publicacaoId: number
  ): Observable<any> {
    return this._http
      .delete<any>(
        `${this.NEW_URL}/publicacao/removerCurtidaPublicacao/${userId}/${publicacaoId}`,
        this.getHttpOptions()
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
