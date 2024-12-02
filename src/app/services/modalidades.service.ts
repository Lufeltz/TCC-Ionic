import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ModalidadeEsportiva, Modalidades } from '../models/modalidades.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ModalidadesService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/modalidadeEsportiva';

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

  getModalidadesInscritas(usuarioId: number): Observable<Modalidades | null> {
    return this._http
      .get<Modalidades>(
        `${this.NEW_URL}/listar/${usuarioId}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Modalidades>) => {
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

  getAllModalidades(): Observable<ModalidadeEsportiva[] | null> {
    return this._http
      .get<ModalidadeEsportiva[]>(
        `${this.NEW_URL}/listar`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<ModalidadeEsportiva[]>) => {
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

  inscreverModalidade(
    usuarioId: number,
    modalidadeId: number
  ): Observable<any> {
    const url = `${this.NEW_URL}/inscrever/${usuarioId}/${modalidadeId}`;
    return this._http.post(url, null, this.getHttpOptions()).pipe(
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
    return this._http.delete(url, this.getHttpOptions()).pipe(
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
