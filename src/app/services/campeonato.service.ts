import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, throwError } from 'rxjs';
import { Campeonato } from '../models/campeonato.model';
import { CampeonatoCriacao } from '../models/campeonato-criacao.model';
import { Avaliacao } from '../models/avaliacao.model';
import { AuthService } from './auth.service';
import { JogadorResponse } from '../models/jogador-response.model';

@Injectable({
  providedIn: 'root',
})
export class CampeonatoService {
  private campeonatoCreatedSource = new Subject<void>();
  campeonatoCreated$ = this.campeonatoCreatedSource.asObservable();

  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/campeonatos';

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

  sairDoTime(idCampeonato: number, idAcademico: number): Observable<any> {
    const url = `${this.NEW_URL}/${idCampeonato}/times/${idAcademico}`;

    return this._http.delete<any>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 204) {
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

  excluirCampeonato(idCampeonato: number): Observable<any> {
    const url = `${this.NEW_URL}/${idCampeonato}`;

    return this._http.delete<any>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 204) {
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

  getJogadoresEnfrentados(
    idAcademico: number,
    page: number,
    size: number,
    sort: string = 'dataCriacao,desc'
  ): Observable<JogadorResponse | null> {
    return this._http
      .get<JogadorResponse>(
        `${this.NEW_URL}/${idAcademico}/jogadores-enfrentados?page=${page}&size=${size}&sort=${sort}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<JogadorResponse>) => {
          if (resp.status === 200) {
            return resp.body;
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

  filtrarCampeonato(codigo: string): Observable<Campeonato[] | null> {
    return this._http
      .get<Campeonato[]>(
        `${this.NEW_URL}/filtrar?codigo=${encodeURIComponent(codigo)}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
          if (resp.status === 200 && resp.body) {
            return resp.body;
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

  filtrarCampeonatos(
    codigo?: string,
    titulo?: string
  ): Observable<Campeonato[] | null> {
    let url = `${this.NEW_URL}/filtrar`;

    let params = new HttpParams();
    if (codigo) {
      params = params.set('codigo', codigo);
    }
    if (titulo) {
      params = params.set('titulo', titulo);
    }

    return this._http
      .get<Campeonato[]>(url, { params, ...this.getHttpOptions() })
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  avaliarJogador(
    idAvaliador: number,
    idAcademico: number,
    nota: number,
    idModalidade: number
  ): Observable<any> {
    const url = `${this.NEW_URL}/avaliar?idAvaliador=${idAvaliador}&idAcademico=${idAcademico}&nota=${nota}&idModalidade=${idModalidade}`;

    return this._http.post<any>(url, null, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
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

  getMediaAvaliacao(academicoId: number): Observable<Avaliacao | null> {
    return this._http
      .get<Avaliacao>(
        `${this.NEW_URL}/avaliacao/${academicoId}/mediaAvaliacao`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Avaliacao>) => {
          if (resp.status === 200 && resp.body) {
            return resp.body;
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

  getHistoricoCampeonato(
    id: number,
    page: number,
    size: number,
    sort: string
  ): Observable<Campeonato[] | null> {
    return this._http
      .get<Campeonato[]>(
        `${this.NEW_URL}/historico/${id}?page=${page}&size=${size}&sort=${sort}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getHistoricoCampeonatoAcademico(
    id: number,
    page: number,
    size: number,
    sort: string
  ): Observable<Campeonato[] | null> {
    return this._http
      .get<Campeonato[]>(
        `${this.NEW_URL}/historico/academico/${id}?page=${page}&size=${size}&sort=${sort}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getCampeonatosPorModalidadeAcademico(
    idAcademico: number,
    page: number,
    size: number,
    sort: string = 'dataCriacao'
  ): Observable<Campeonato[] | null> {
    return this._http
      .get<Campeonato[]>(
        `${this.NEW_URL}/${idAcademico}/listar?page=${page}&size=${size}&sort=${sort}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getAllCampeonatos(
    page: number,
    size: number
  ): Observable<Campeonato[] | null> {
    return this._http
      .get<Campeonato[]>(
        `${this.NEW_URL}/listar?page=${page}&size=${size}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getCampeonatoById(id: number): Observable<Campeonato | null> {
    return this._http
      .get<Campeonato>(
        `${this.NEW_URL}/aeroportos/${id}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  postCampeonato(
    campeonato: CampeonatoCriacao
  ): Observable<CampeonatoCriacao | null> {
    return this._http
      .post<CampeonatoCriacao>(
        `${this.NEW_URL}`,
        JSON.stringify(campeonato),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<CampeonatoCriacao>) => {
          if (resp.status == 201) {
            this.campeonatoCreatedSource.next();
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  putCampeonato(campeonato: Campeonato): Observable<Campeonato | null> {
    return this._http
      .put<Campeonato>(
        `${this.NEW_URL}/campeonatos/${campeonato.idCampeonato}`,
        JSON.stringify(campeonato),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  deleteCampeonato(id: string): Observable<Campeonato | null> {
    return this._http
      .delete<Campeonato>(
        `${this.NEW_URL}/aeroportos/${id}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Campeonato>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
