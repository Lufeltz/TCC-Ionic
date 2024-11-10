import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { MetaDiaria } from '../models/meta-diaria.model';

@Injectable({
  providedIn: 'root',
})
export class MetaDiariaService {
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/metaDiaria';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getMetaDiariaByAcademicoId(idAcademico: number): Observable<MetaDiaria[] | null> {
    return this._http
      .get<MetaDiaria[]>(`${this.NEW_URL}/listar/${idAcademico}`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<MetaDiaria[]>) => {
          if (resp.status === 200) {
            return resp.body;  // Agora retorna um array de MetaDiaria[]
          } else {
            return null;
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of(null);  // Retorna null se não houver dados
          } else {
            return throwError(() => err);  // Retorna o erro para tratamento posterior
          }
        })
      );
  }
  

  getMetaDiariaById(id: number): Observable<MetaDiaria | null> {
    return this._http
      .get<MetaDiaria>(`${this.NEW_URL}/aeroportos/${id}`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<MetaDiaria>) => {
          if (resp.status == 200) {
            return resp.body;
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

  postMetaDiaria(metaDiaria: MetaDiaria): Observable<MetaDiaria | null> {
    return this._http
      .post<MetaDiaria>(
        this.NEW_URL,
        metaDiaria, // Remova o JSON.stringify aqui
        { ...this.httpOptions, observe: 'response' } // Certifique-se de que observe esteja definido como 'response'
      )
      .pipe(
        map((resp: HttpResponse<MetaDiaria>) => {
          if (resp.status === 201) {
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

  putMetaDiaria(metaDiaria: MetaDiaria): Observable<MetaDiaria | null> {
    return this._http
      .put<MetaDiaria>(
        `${this.NEW_URL}/campeonatos/${metaDiaria.idMetaDiaria}`,
        JSON.stringify(metaDiaria),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<MetaDiaria>) => {
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

  deleteMetaDiaria(id: string): Observable<MetaDiaria | null> {
    return this._http
      .delete<MetaDiaria>(`${this.NEW_URL}/excluir/${id}`, { observe: 'response' })
      .pipe(
        map((resp: HttpResponse<MetaDiaria>) => {
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
