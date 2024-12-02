import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { MetaEsportiva } from '../models/meta-esportiva.model';
import { ModalidadeEsportiva } from '../models/modalidades.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MetaEsportivaService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/metaEsportiva';
  MODALIDADE_ALL = 'http://localhost:8081/modalidadeEsportiva';
  MODALIDADE_URL = 'http://localhost:8081/modalidadeEsportiva/metaEsportiva';

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

  getModalidadesPorUsuario(
    idUsuario: number
  ): Observable<ModalidadeEsportiva[]> {
    return this._http
      .get<ModalidadeEsportiva[]>(
        `${this.MODALIDADE_ALL}/listar/${idUsuario}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<ModalidadeEsportiva[]>) => {
          if (resp.status === 200) {
            return resp.body || [];
          } else {
            return [];
          }
        }),
        catchError((err) => {
          console.error('Erro ao buscar modalidades do usuário:', err);
          return of([]);
        })
      );
  }

  getAllMetasEsportivas(): Observable<MetaEsportiva[] | null> {
    return this._http
      .get<MetaEsportiva[]>(
        `${this.MODALIDADE_ALL}/listar`,
        this.getHttpOptions()
      )
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

  getMetasPorModalidade(
    idModalidade: number
  ): Observable<MetaEsportiva[] | null> {
    return this._http
      .get<MetaEsportiva[]>(
        `${this.MODALIDADE_URL}/listar/${idModalidade}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<MetaEsportiva[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
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
        metaEsportiva,
        this.getHttpOptions()
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
