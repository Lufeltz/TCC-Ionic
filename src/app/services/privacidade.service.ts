import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Privacidade } from '../models/privacidade.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivacidadeService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  BASE_URL = 'http://localhost:8081/academico';

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

  getPrivacidades(id: number): Observable<Privacidade | null> {
    const url = `${this.BASE_URL}/privacidade/${id}`;
    return this._http.get<Privacidade>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Privacidade>) => {
        if (resp.status === 200) {
          return resp.body || null;
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

  atualizarPrivacidade(privacidade: Privacidade): Observable<Privacidade> {
    const url = `${this.BASE_URL}/privacidade`;
    return this._http
      .put<Privacidade>(url, privacidade, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<Privacidade>) => {
          if (resp.status === 200) {
            return resp.body as Privacidade;
          } else {
            throw new Error('Erro ao atualizar os dados de privacidade');
          }
        }),
        catchError((err) => {
          console.error('Erro ao atualizar privacidade:', err);
          return throwError(() => err);
        })
      );
  }
}
