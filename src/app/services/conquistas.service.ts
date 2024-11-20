import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conquista } from '../models/conquista.model'; // Certifique-se de ter o modelo Conquista importado
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token

@Injectable({
  providedIn: 'root',
})
export class ConquistasService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  // Defina a URL base para o serviço de conquistas
  NEW_URL = 'http://localhost:8081/conquista';

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

  atualizarConquista(
    metaEsportiva: Conquista
  ): Observable<Conquista | null> {
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

  // Método para listar as conquistas de um usuário
  getConquistasByUserId(idAcademico: number): Observable<Conquista[] | null> {
    const url = `${this.NEW_URL}/listarConquistas/${idAcademico}`;
    return this._http.get<Conquista[]>(url, this.getHttpOptions()).pipe(
      map((resp) => {
        // Retorna o corpo da resposta caso o status seja 200
        return resp.body ? resp.body : [];
      }),
      catchError((err) => {
        // Se a resposta for um erro, retorna um array vazio ou o erro em caso de falha
        if (err.status === 404) {
          return of([]); // Retorna um array vazio em caso de erro 404 (não encontrado)
        } else {
          return throwError(() => err); // Retorna o erro para tratamento posterior
        }
      })
    );
  }
}
