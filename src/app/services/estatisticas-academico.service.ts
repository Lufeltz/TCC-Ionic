import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { EstatisticaUso } from '../models/estatistica-uso.model';
import { EstatisticaModalidade } from '../models/estatistica-modalidade.model';
import { EstatisticaModalidadeGeral } from '../models/estatistica-modalidade-geral.model';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token
import { APP_CONFIG } from './host';

@Injectable({
  providedIn: 'root',
})
export class EstatisticasAcademicoService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  private ip: string = APP_CONFIG.ip;

  BASE_URL = `http://${this.ip}:8081/academico`;
  ESTATISTICAS_URL = `http://${this.ip}:8081/estatistica`;

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

  getEstatisticasUso(id: number): Observable<EstatisticaUso[] | null> {
    const url = `${this.BASE_URL}/uso/${id}`;
    return this._http.get<EstatisticaUso[]>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<EstatisticaUso[]>) => {
        if (resp.status == 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        if (err.status == 404) {
          return of([] as EstatisticaUso[]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  getEstatisticasModalidade(
    idAcademico: number,
    idModalidade: number
  ): Observable<EstatisticaModalidade[] | null> {
    const url = `${this.BASE_URL}/estatisticas/${idAcademico}/modalidade/${idModalidade}`;
    return this._http
      .get<EstatisticaModalidade[]>(url, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<EstatisticaModalidade[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([] as EstatisticaModalidade[]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  getEstatisticasMetasEsportivas(
    idAcademico: number
  ): Observable<EstatisticaModalidadeGeral | null> {
    const url = `${this.ESTATISTICAS_URL}/visualizarEstatisticasMetasEsportivas/${idAcademico}`;
    return this._http
      .get<EstatisticaModalidadeGeral>(url, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<EstatisticaModalidadeGeral>) => {
          if (resp.status === 200) {
            return resp.body; // Retorna um único objeto EstatisticaModalidadeGeral
          } else {
            return null; // Caso o status não seja 200, retorna null
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of(null); // Retorna null caso o erro seja 404
          } else {
            return throwError(() => err); // Repassa outros erros
          }
        })
      );
  }

  // Novo método para o endpoint visualizarEstatisticasMetasEsportivasOutroAcademico
  getEstatisticasMetasEsportivasOutroAcademico(
    idAcademico: number
  ): Observable<EstatisticaModalidadeGeral | null> {
    const url = `${this.ESTATISTICAS_URL}/visualizarEstatisticasMetasEsportivasOutroAcademico/${idAcademico}`;
    return this._http
      .get<EstatisticaModalidadeGeral>(url, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<EstatisticaModalidadeGeral>) => {
          if (resp.status === 200) {
            return resp.body; // Retorna um único objeto EstatisticaModalidadeGeral
          } else {
            return null; // Caso o status não seja 200, retorna null
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of(null); // Retorna null caso o erro seja 404
          } else {
            return throwError(() => err); // Repassa outros erros
          }
        })
      );
  }
}
