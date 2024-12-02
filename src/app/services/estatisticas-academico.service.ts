import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { EstatisticaUso } from '../models/estatistica-uso.model';
import { EstatisticaModalidade } from '../models/estatistica-modalidade.model';
import { EstatisticaModalidadeGeral } from '../models/estatistica-modalidade-geral.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EstatisticasAcademicoService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  BASE_URL = 'http://localhost:8081/academico';
  ESTATISTICAS_URL = 'http://localhost:8081/estatistica';

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

  getEstatisticasUso(id: number): Observable<EstatisticaUso[] | null> {
    const url = `${this.BASE_URL}/uso/${id}`;
    return this._http.get<EstatisticaUso[]>(url, this.getHttpOptions()).pipe(
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
    return this._http
      .get<EstatisticaModalidade[]>(url, this.getHttpOptions())
      .pipe(
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

  getEstatisticasMetasEsportivas(
    idAcademico: number
  ): Observable<EstatisticaModalidadeGeral | null> {
    const url = `${this.ESTATISTICAS_URL}/visualizarEstatisticasMetasEsportivas/${idAcademico}`;
    return this._http
      .get<EstatisticaModalidadeGeral>(url, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<EstatisticaModalidadeGeral>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getEstatisticasMetasEsportivasOutroAcademico(
    idAcademico: number
  ): Observable<EstatisticaModalidadeGeral | null> {
    const url = `${this.ESTATISTICAS_URL}/visualizarEstatisticasMetasEsportivasOutroAcademico/${idAcademico}`;
    return this._http
      .get<EstatisticaModalidadeGeral>(url, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<EstatisticaModalidadeGeral>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }
}
