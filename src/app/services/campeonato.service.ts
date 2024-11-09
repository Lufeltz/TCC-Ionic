import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Campeonato } from '../models/campeonato.model';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/campeonatos';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllCampeonatos(): Observable<Campeonato[] | null> {
    return this._http
      .get<Campeonato[]>(`${this.NEW_URL}/listar`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
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

  // Alterar URL
  getCampeonatoById(id: number): Observable<Campeonato | null> {
    return this._http
      .get<Campeonato>(`${this.NEW_URL}/aeroportos/${id}`,this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
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


  postCampeonato(campeonato: Campeonato): Observable<Campeonato | null> {
    return this._http
      .post<Campeonato>(
        `${this.NEW_URL}`,
        JSON.stringify(campeonato),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
          if (resp.status == 201) {
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

  putCampeonato(campeonato: Campeonato): Observable<Campeonato | null> {
    return this._http
      .put<Campeonato>(
        `${this.NEW_URL}/campeonatos/${campeonato.idCampeonato}`,
        JSON.stringify(campeonato),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
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

  deleteCampeonato(id: string): Observable<Campeonato | null> {
    return this._http
      .delete<Campeonato>(
        `${this.NEW_URL}/aeroportos/${id}`,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
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
