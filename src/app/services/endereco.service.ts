import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/endereco';

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

  getEnderecoByCep(cep: string): Observable<Endereco | null> {
    return this._http
      .get<Endereco>(`${this.NEW_URL}/consultar/${cep}`, this.getHttpOptions())
      .pipe(
        map((response: HttpResponse<Endereco>) => {
          if (response.body) {
            return response.body;
          } else {
            console.error('Nenhum dado retornado');
            return null;
          }
        }),
        catchError((err) => {
          console.error('Erro na requisição:', err);
          return throwError(() => err);
        })
      );
  }
}
