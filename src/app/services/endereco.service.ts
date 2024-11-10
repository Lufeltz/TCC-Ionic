import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  NEW_URL = 'http://localhost:8081/endereco';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  getEnderecoByCep(cep: string): Observable<Endereco | null> {
    return this._http
      .get<Endereco>(`${this.NEW_URL}/consultar/${cep}`, this.httpOptions)
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