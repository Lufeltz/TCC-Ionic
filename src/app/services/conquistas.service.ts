import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conquista } from '../models/conquista.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConquistasService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/conquista';

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

  getConquistasByOutroAcademico(
    idOutroAcademico: number
  ): Observable<Conquista[] | null> {
    const url = `${this.NEW_URL}/listarConquistasOutroAcademico/${idOutroAcademico}`;
    return this._http.get<Conquista[]>(url, this.getHttpOptions()).pipe(
      map((resp) => {
        return resp.body ? resp.body : [];
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

  getConquistasByUserId(idAcademico: number): Observable<Conquista[] | null> {
    const url = `${this.NEW_URL}/listarConquistas/${idAcademico}`;
    return this._http.get<Conquista[]>(url, this.getHttpOptions()).pipe(
      map((resp) => {
        return resp.body ? resp.body : [];
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

  atualizarConquista(metaEsportiva: Conquista): Observable<Conquista | null> {
    const url = `${this.NEW_URL}/atualizarConquista`;
    return this._http
      .put<Conquista>(url, metaEsportiva, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<Conquista>) => {
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
