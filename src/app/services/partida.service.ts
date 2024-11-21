import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CriarTime } from '../models/criar-time.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Time } from '../models/time.model';
import { Jogador } from '../models/jogador.model';
import { JogadorResponse } from '../models/jogador-response.model';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/campeonatos/times'; // Atualize para o novo endpoint
  BASE_URL = 'http://localhost:8081/campeonatos';

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

  // Função para inscrever um time em um campeonato
  inscreverTime(time: CriarTime): Observable<any> {
    const url = `${this.NEW_URL}`;
    return this._http.post(url, time, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
          return resp.body; // Retorna a resposta do corpo da requisição
        } else {
          return null; // Caso não tenha sucesso
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Função para listar times de um campeonato
  listarTimes(idCampeonato: number): Observable<Time[]> {
    const url = `${this.BASE_URL}/${idCampeonato}/times`;
    return this._http.get<Time[]>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Time[]>) => {
        if (resp.status === 200) {
          return resp.body || []; // Retorna a lista de times
        } else {
          return []; // Retorna uma lista vazia em caso de falha
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Função para listar jogadores de um campeonato
  listarJogadores(idCampeonato: number): Observable<JogadorResponse> {
    const url = `${this.BASE_URL}/${idCampeonato}/jogadores`;
    return this._http.get<JogadorResponse>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<JogadorResponse>) => {
        if (resp.status === 200) {
          return resp.body || new JogadorResponse(); // Retorna o objeto JogadorResponse ou um novo objeto com valores padrão
        } else {
          return new JogadorResponse(); // Retorna um novo objeto JogadorResponse com valores padrão
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }
  
}
