import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conquista } from '../models/conquista.model'; // Certifique-se de ter o modelo Conquista importado

@Injectable({
  providedIn: 'root',
})
export class ConquistasService {
  constructor(private _http: HttpClient) {}

  // Defina a URL base para o serviço de conquistas
  NEW_URL = 'http://localhost:8081/conquista';

  // Configurações de cabeçalho para as requisições HTTP
  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Método para listar as conquistas de um usuário
  getConquistasByUserId(idAcademico: number): Observable<Conquista[] | null> {
    const url = `${this.NEW_URL}/listarConquistas/${idAcademico}`;
    return this._http.get<Conquista[]>(url, this.httpOptions).pipe(
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
