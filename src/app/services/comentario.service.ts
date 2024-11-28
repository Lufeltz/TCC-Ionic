import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioApiResponse } from '../models/comentario-api-response.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Comentario } from '../models/comentario.model';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token
import { APP_CONFIG } from './host';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService
  private ip: string = APP_CONFIG.ip;
  private readonly NEW_URL = `http://${this.ip}:8081`;



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

  getAllComentarios(
    postId: number,
    page: number = 0,
    size: number = 10,
    sort: string = 'dataComentario,desc'
  ): Observable<ComentarioApiResponse> {
    const url = `${this.NEW_URL}/comentario/${postId}/comentarios?page=${page}&size=${size}&sort=${sort}`;

    return this._http
      .get<ComentarioApiResponse>(url, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<ComentarioApiResponse>) => {
          if (resp.status === 200 && resp.body) {
            return resp.body;
          } else {
            return {
              content: [],
              totalElements: 0,
              totalPages: 0,
              first: false,
              last: false,
              size: 0,
              number: 0,
              numberOfElements: 0,
              pageable: {},
              empty: true,
            };
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of({
              content: [],
              totalElements: 0,
              totalPages: 0,
              first: false,
              last: false,
              size: 0,
              number: 0,
              numberOfElements: 0,
              pageable: {},
              empty: true,
            }); // Retorna um objeto vazio se a página não for encontrada
          } else {
            return throwError(() => err); // Caso de erro diferente, lança o erro
          }
        })
      );
  }

  postComentario(comentario: Comentario): Observable<Comentario | null> {
    return this._http
      .post<Comentario>(
        `${this.NEW_URL}/comentario/cadastrarComentario`,
        JSON.stringify(comentario),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Comentario>) => {
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

  curtirComentario(userId: number, comentarioId: number): Observable<any> {
    const url = `${this.NEW_URL}/comentario/curtirComentario/${userId}/${comentarioId}`;
    return this._http.post(url, {}, this.getHttpOptions()).pipe(
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

  removerCurtidaComentario(
    userId: number,
    comentarioId: number
  ): Observable<any> {
    const url = `${this.NEW_URL}/comentario/removerCurtidaComentario/${userId}/${comentarioId}`;
    return this._http.delete(url, this.getHttpOptions()).pipe(
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
}
