import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ModalidadeEsportiva, Modalidades } from '../models/modalidades.model';

@Injectable({
  providedIn: 'root',
})
export class ModalidadesService {
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/modalidadeEsportiva';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Ajuste no tipo do retorno para Modalidades, que contém ModalidadeEsportiva[]
  getModalidadesInscritas(usuarioId: number): Observable<Modalidades | null> {
    return this._http
      .get<Modalidades>(`${this.NEW_URL}/listar/${usuarioId}`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Modalidades>) => {
          if (resp.status == 200) {
            return resp.body; // Retorna a estrutura de Modalidades
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  // Retorna um array de Modalidades, e cada Modalidade possui ModalidadeEsportiva[] dentro dela
  getAllModalidades(): Observable<ModalidadeEsportiva[] | null> {
    return this._http
      .get<ModalidadeEsportiva[]>(`${this.NEW_URL}/listar`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<ModalidadeEsportiva[]>) => {
          if (resp.status === 200) {
            return resp.body; // Retorna o array de ModalidadeEsportiva
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]); // Retorna um array vazio em caso de erro
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  inscreverModalidade(
    usuarioId: number,
    modalidadeId: number
  ): Observable<any> {
    const url = `${this.NEW_URL}/inscrever/${usuarioId}/${modalidadeId}`;
    return this._http.post(url, null, this.httpOptions).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status == 201) {
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

  removerModalidade(usuarioId: number, modalidadeId: number): Observable<any> {
    const url = `${this.NEW_URL}/remover/${usuarioId}/${modalidadeId}`;
    return this._http.delete(url, this.httpOptions).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200) {
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
