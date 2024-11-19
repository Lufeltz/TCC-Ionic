import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { MetaEsportiva } from '../models/meta-esportiva.model';
import { ModalidadeEsportiva } from '../models/modalidades.model';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token

@Injectable({
  providedIn: 'root',
})
export class MetaEsportivaService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  NEW_URL = 'http://localhost:8081/metaEsportiva';
  MODALIDADE_ALL = 'http://localhost:8081/modalidadeEsportiva';
  MODALIDADE_URL = 'http://localhost:8081/modalidadeEsportiva/metaEsportiva';

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

  // Adicione esta função ao seu serviço
  getModalidadesPorUsuario(
    idUsuario: number
  ): Observable<ModalidadeEsportiva[]> {
    return this._http
      .get<ModalidadeEsportiva[]>(
        `${this.MODALIDADE_ALL}/listar/${idUsuario}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<ModalidadeEsportiva[]>) => {
          if (resp.status === 200) {
            return resp.body || [];
          } else {
            return [];
          }
        }),
        catchError((err) => {
          console.error('Erro ao buscar modalidades do usuário:', err);
          return of([]); // Retorna um array vazio em caso de erro
        })
      );
  }

  getAllMetasEsportivas(): Observable<MetaEsportiva[] | null> {
    return this._http
      .get<MetaEsportiva[]>(
        `${this.MODALIDADE_ALL}/listar`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<MetaEsportiva[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  // Método para buscar metas de uma modalidade esportiva específica
  getMetasPorModalidade(
    idModalidade: number
  ): Observable<MetaEsportiva[] | null> {
    return this._http
      .get<MetaEsportiva[]>(
        `${this.MODALIDADE_URL}/listar/${idModalidade}`,
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<MetaEsportiva[]>) => {
          if (resp.status === 200) {
            return resp.body; // Retorna o corpo da resposta, que contém as metas
          } else {
            return []; // Se o status não for 200, retorna um array vazio
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]); // Caso o endpoint não seja encontrado, retorna um array vazio
          } else {
            return throwError(() => err); // Lança outro erro
          }
        })
      );
  }

  putMetaEsportiva(
    metaEsportiva: MetaEsportiva
  ): Observable<MetaEsportiva | null> {
    return this._http
      .put<MetaEsportiva>(
        `${this.NEW_URL}/campeonatos/${metaEsportiva.idMetaEsportiva}`,
        metaEsportiva, // Envia o objeto metaEsportiva diretamente
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<MetaEsportiva>) => {
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
