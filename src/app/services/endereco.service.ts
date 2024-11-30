import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  NEW_URL = 'http://localhost:8081/endereco';

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

  getEnderecoByCep(cep: string): Observable<Endereco | null> {
    return this._http
      .get<Endereco>(`${this.NEW_URL}/consultar/${cep}`, this.getHttpOptions())
      .pipe(
        map((response: HttpResponse<Endereco>) => {
          // Verificar se a resposta tem um corpo válido
          if (response.body) {
            return response.body; // Retorna o endereço se encontrar um corpo na resposta
          } else {
            console.error('Nenhum dado retornado');
            return null; // Retorna null caso não tenha dados
          }
        }),
        catchError((err) => {
          console.error('Erro na requisição:', err);
          return throwError(() => err); // Propaga o erro
        })
      );
  }
}
