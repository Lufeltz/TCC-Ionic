import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Saude } from '../models/saude.model';
import { AuthService } from './auth.service'; // Importa o AuthService

@Injectable({
  providedIn: 'root',
})
export class SaudeService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

    NEW_URL = 'http://localhost:8081/apoioSaude';

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

  getContatosSaude(): Observable<Saude[] | null> {
    return this._http
      .get<Saude[]>(`${this.NEW_URL}`, this.getHttpOptions()) // Usa getHttpOptions para incluir o token
      .pipe(
        map((resp: HttpResponse<Saude[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of([]); // Retorna um array vazio caso não haja dados
          } else {
            return throwError(() => err); // Retorna erro em caso de falha
          }
        })
      );
  }
}
