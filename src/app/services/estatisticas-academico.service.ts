import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { EstatisticaUso } from '../models/estatistica-uso.model';
import { EstatisticaModalidade } from '../models/estatistica-modalidade.model';

@Injectable({
  providedIn: 'root',
})
export class EstatisticasAcademicoService {
  constructor(private _http: HttpClient) {}

  BASE_URL = 'http://localhost:8081/academico';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEstatisticasUso(id: number): Observable<EstatisticaUso[] | null> {
    const url = `${this.BASE_URL}/uso/${id}`;
    return this._http.get<EstatisticaUso[]>(url, this.httpOptions).pipe(
      map((resp: HttpResponse<EstatisticaUso[]>) => {
        if (resp.status == 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        if (err.status == 404) {
          return of([] as EstatisticaUso[]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  getEstatisticasModalidade(
    idAcademico: number,
    idModalidade: number
  ): Observable<EstatisticaModalidade[] | null> {
    const url = `${this.BASE_URL}/estatisticas/${idAcademico}/modalidade/${idModalidade}`;
    return this._http.get<EstatisticaModalidade[]>(url, this.httpOptions).pipe(
      map((resp: HttpResponse<EstatisticaModalidade[]>) => {
        if (resp.status == 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        if (err.status == 404) {
          return of([] as EstatisticaModalidade[]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
