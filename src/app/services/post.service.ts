import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { PostApiResponse } from '../models/post-api-response.model';
import { AuthService } from './auth.service'; // Importa o AuthService para obter o token

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient, private authService: AuthService) {} // Injeta o AuthService

  NEW_URL = 'http://localhost:8081';

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

  getAllPosts(
    page: number = 0,
    size: number = 10,
    sort: string = 'dataPublicacao,desc'
  ): Observable<PostApiResponse> {
    const url = `${this.NEW_URL}/publicacao/1/publicacoes?page=${page}&size=${size}&sort=${sort}`;

    return this._http.get<PostApiResponse>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<PostApiResponse>) => {
        if (resp.status == 200 && resp.body) {
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
      catchError((err, caught) => {
        if (err.status == 404) {
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

  // Alterar URL
  getPostById(id: number): Observable<Post | null> {
    return this._http
      .get<Post>(`${this.NEW_URL}/aeroportos/${id}`, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<Post>) => {
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

  postPost(post: Post): Observable<Post | null> {
    return this._http
      .post<Post>(
        `${this.NEW_URL}`,
        JSON.stringify(post),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Post>) => {
          if (resp.status == 201) {
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

  putPost(post: Post): Observable<Post | null> {
    return this._http
      .put<Post>(
        `${this.NEW_URL}/publicacao/${post.idPublicacao}`,
        JSON.stringify(post),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<Post>) => {
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

  deletePost(id: string): Observable<Post | null> {
    return this._http
      .delete<Post>(`${this.NEW_URL}/aeroportos/${id}`, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<Post>) => {
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
