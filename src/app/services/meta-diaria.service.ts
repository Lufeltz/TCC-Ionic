import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { MetaDiaria } from '../models/meta-diaria.model';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token

@Injectable({
  providedIn: 'root',
})
export class MetaDiariaService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  NEW_URL = 'http://localhost:8081/metaDiaria';

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
      .post<MetaDiaria>(
        this.NEW_URL,
        metaDiaria, // Envia o objeto metaDiaria diretamente
        this.getHttpOptions()
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
        this.NEW_URL, // Endpoint já correto
        metaDiaria, // Envia o objeto metaDiaria diretamente
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
