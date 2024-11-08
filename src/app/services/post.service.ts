import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllPosts(
    page: number = 0,
    size: number = 10,
    sort: string = 'dataPublicacao,desc'
  ): Observable<Post[] | null> {
    // Construa a URL com base nos parâmetros de paginação
    const url = `${this.NEW_URL}/publicacao/1/publicacoes?page=${page}&size=${size}&sort=${sort}`;


    return this._http.get<Post[]>(url, this.httpOptions).pipe(
      map((resp: HttpResponse<Post[]>) => {
        if (resp.status == 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err, caught) => {
        if (err.status == 404) {
          return of([]); // Retorna um array vazio se a página não for encontrada
        } else {
          return throwError(() => err); // Caso de erro diferente, lança o erro
        }
      })
    );
  }

  // Alterar URL
  getPostById(id: number): Observable<Post | null> {
    return this._http
      .get<Post>(`${this.NEW_URL}/aeroportos/${id}`, this.httpOptions)
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
      .post<Post>(`${this.NEW_URL}`, JSON.stringify(post), this.httpOptions)
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
        this.httpOptions
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
      .delete<Post>(`${this.NEW_URL}/aeroportos/${id}`, this.httpOptions)
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
