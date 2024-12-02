import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { MetaDiaria } from '../models/meta-diaria.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MetaDiariaService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/metaDiaria';

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

  getMetaDiariaByAcademicoId(
    idAcademico: number
  ): Observable<MetaDiaria[] | null> {
    return this._http
      .get<MetaDiaria[]>(
        `${this.NEW_URL}/listar/${idAcademico}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<MetaDiaria[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getMetaDiariaById(id: number): Observable<MetaDiaria | null> {
    return this._http
      .get<MetaDiaria>(
        `${this.NEW_URL}/aeroportos/${id}`,
        this.getHttpOptions()
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
      .post<MetaDiaria>(this.NEW_URL, metaDiaria, this.getHttpOptions())
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
      .put<MetaDiaria>(this.NEW_URL, metaDiaria, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<MetaDiaria>) => {
          if (resp.status === 200) {
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
      .delete<MetaDiaria>(
        `${this.NEW_URL}/excluir/${id}`,
        this.getHttpOptions()
      )
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
