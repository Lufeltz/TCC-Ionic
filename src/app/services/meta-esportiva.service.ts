import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { MetaEsportiva } from '../models/meta-esportiva.model';

@Injectable({
  providedIn: 'root',
})
export class MetaEsportivaService {
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/metaEsportiva';
  MODALIDADE_ALL ='http://localhost:8081/modalidadeEsportiva'
  MODALIDADE_URL = 'http://localhost:8081/modalidadeEsportiva/metaEsportiva';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllMetasEsportivas(): Observable<MetaEsportiva[] | null> {
    return this._http
      .get<MetaEsportiva[]>(`${this.MODALIDADE_ALL}/listar`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<MetaEsportiva[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  // Método para buscar metas de uma modalidade esportiva específica
  getMetasPorModalidade(idModalidade: number): Observable<MetaEsportiva[] | null> {
    return this._http
      .get<MetaEsportiva[]>(
        `${this.MODALIDADE_URL}/listar/${idModalidade}`, // Endpoint atualizado com o ID da modalidade
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<MetaEsportiva[]>) => {
          if (resp.status === 200) {
            return resp.body; // Retorna o corpo da resposta, que contém as metas
          } else {
            return []; // Se o status não for 200, retorna um array vazio
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]); // Caso o endpoint não seja encontrado, retorna um array vazio
          } else {
            return throwError(() => err); // Lança outro erro
          }
        })
      );
  }

  putMetaEsportiva(
    metaEsportiva: MetaEsportiva
  ): Observable<MetaEsportiva | null> {
    return this._http
      .put<MetaEsportiva>(
        `${this.NEW_URL}/campeonatos/${metaEsportiva.idMetaEsportiva}`,
        JSON.stringify(MetaEsportiva),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<MetaEsportiva>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
