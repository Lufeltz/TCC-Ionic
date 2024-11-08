import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioApiResponse } from '../models/comentario-api-response.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private readonly NEW_URL = 'http://localhost:8081';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  getAllComentarios(
    postId: number,
    page: number = 0,
    size: number = 10,
    sort: string = 'dataComentario,desc'
  ): Observable<ComentarioApiResponse> {
    const url = `${this.NEW_URL}/comentario/${postId}/comentarios?page=${page}&size=${size}&sort=${sort}`;

    return this._http.get<ComentarioApiResponse>(url, this.httpOptions).pipe(
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
}
