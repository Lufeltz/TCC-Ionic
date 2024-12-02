import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CriarTime } from '../models/criar-time.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Time } from '../models/time.model';
import { JogadorResponse } from '../models/jogador-response.model';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/campeonatos/times';
  BASE_URL = 'http://localhost:8081/campeonatos';

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

  criarTimeIndividual(
    idCampeonato: number,
    idUsuario: number,
    senha?: string
  ): Observable<any> {
    const url = `${this.BASE_URL}/${idCampeonato}/times/${idUsuario}`;

    const body = senha ? senha : {};

    return this._http.post(url, body, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
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

  inscreverTime(time: CriarTime): Observable<any> {
    const url = `${this.NEW_URL}`;
    return this._http.post(url, time, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
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

  salvarPontuacao(partida: Partida): Observable<any> {
    const url = `${this.BASE_URL}/partidas/${partida.idPartida}/pontuacao?pontuacaoTime1=${partida.resultado?.pontuacaoTime1}&pontuacaoTime2=${partida.resultado?.pontuacaoTime2}`;
    return this._http.put(url, {}, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200 || resp.status === 201) {
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

  iniciarPrimeiraFase(idCampeonato: number): Observable<any> {
    const url = `${this.BASE_URL}/${idCampeonato}/primeira-fase`;
    return this._http.post(url, {}, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201 || resp.status === 200) {
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

  avancarFase(idCampeonato: number): Observable<any> {
    const url = `${this.BASE_URL}/${idCampeonato}/avancar-fase`;
    return this._http.post(url, {}, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200 || resp.status === 201) {
          return resp.body;
        } else {
          return null;
        }
      }),
      catchError((err) => {
        if (err.status === 404) {
          console.error('Campeonato não encontrado');
          return throwError(() => new Error('Campeonato não encontrado'));
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  listarTimes(idCampeonato: number): Observable<Time[]> {
    const url = `${this.BASE_URL}/${idCampeonato}/times`;
    return this._http.get<Time[]>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Time[]>) => {
        if (resp.status === 200) {
          return resp.body || [];
        } else {
          return [];
        }
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  listarJogadores(idCampeonato: number): Observable<JogadorResponse> {
    const url = `${this.BASE_URL}/${idCampeonato}/jogadores`;
    return this._http.get<JogadorResponse>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<JogadorResponse>) => {
        if (resp.status === 200) {
          return resp.body || new JogadorResponse();
        } else {
          return new JogadorResponse();
        }
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  adicionarUsuarioAoTime(idUsuario: number, time: Time): Observable<any> {
    const url = `${this.NEW_URL}/${idUsuario}`;
    return this._http.post(url, time, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
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

  listarPartidas(idCampeonato: number): Observable<Partida[]> {
    const url = `${this.BASE_URL}/${idCampeonato}/partidas`;
    return this._http
      .get<Partida[]>(url, { ...this.getHttpOptions(), observe: 'response' })
      .pipe(
        map((resp: HttpResponse<Partida[]>) => {
          if (resp.status === 200) {
            return resp.body || [];
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            console.error('Nenhuma partida encontrada para este campeonato');

            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }
}
