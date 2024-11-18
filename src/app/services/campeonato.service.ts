import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, throwError } from 'rxjs';
import { Campeonato } from '../models/campeonato.model';
import { CampeonatoCriacao } from '../models/campeonato-criacao.model';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable({
  providedIn: 'root',
})
export class CampeonatoService {

  private campeonatoCreatedSource = new Subject<void>();
  campeonatoCreated$ = this.campeonatoCreatedSource.asObservable();

  constructor(private _http: HttpClient) {}
  

  NEW_URL = 'http://localhost:8081/campeonatos';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  avaliarJogador(
    idAvaliador: number,
    idAcademico: number,
    nota: number,
    idModalidade: number
  ): Observable<any> {
    const url = `${this.NEW_URL}/avaliar?idAvaliador=${idAvaliador}&idAcademico=${idAcademico}&nota=${nota}&idModalidade=${idModalidade}`;

    return this._http.post<any>(url, null, this.httpOptions).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200) {
          return resp.body;
        } else {
          return null;
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Em caso de erro, lança o erro para ser tratado posteriormente
      })
    );
  }

  getMediaAvaliacao(academicoId: number): Observable<Avaliacao | null> {
    return this._http
      .get<Avaliacao>(
        `${this.NEW_URL}/avaliacao/${academicoId}/mediaAvaliacao`,
        this.httpOptions
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
          // Tratamento de erros
          if (err.status === 404) {
            return of(null); // Se não encontrado, retorna null
          } else {
            return throwError(() => err); // Outros erros
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
        this.httpOptions
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
        this.httpOptions
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

  // Alterar URL
  getCampeonatoById(id: number): Observable<Campeonato | null> {
    return this._http
      .get<Campeonato>(`${this.NEW_URL}/aeroportos/${id}`, this.httpOptions)
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
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<CampeonatoCriacao>) => {
          if (resp.status == 201) {
            this.campeonatoCreatedSource.next(); // Emitir evento de criação
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
        this.httpOptions
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
      .delete<Campeonato>(`${this.NEW_URL}/aeroportos/${id}`, this.httpOptions)
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
