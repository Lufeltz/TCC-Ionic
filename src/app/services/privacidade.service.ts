import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Privacidade } from '../models/privacidade.model';
import { AuthService } from './auth.service'; // Importando o AuthService

@Injectable({
  providedIn: 'root',
})
export class PrivacidadeService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  BASE_URL = 'http://localhost:8081/academico';

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

  getPrivacidades(id: number): Observable<Privacidade | null> {
    const url = `${this.BASE_URL}/privacidade/${id}`;
    return this._http.get<Privacidade>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Privacidade>) => {
        if (resp.status === 200) {
          return resp.body || null; // Retorna o objeto Privacidade ou null se não existir
        } else {
          return null; // Retorna null se o status não for 200
        }
      }),
      catchError((err) => {
        // Se o erro for 404, retorna null
        if (err.status === 404) {
          return of(null); // Retorna null se não encontrar dados
        } else {
          return throwError(() => err); // Lança o erro para ser tratado no componente
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
            return resp.body as Privacidade; // Retorna o objeto atualizado de privacidade
          } else {
            throw new Error('Erro ao atualizar os dados de privacidade');
          }
        }),
        catchError((err) => {
          console.error('Erro ao atualizar privacidade:', err);
          return throwError(() => err); // Lança o erro para ser tratado no componente
        })
      );
  }
}
