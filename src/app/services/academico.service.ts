import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Academico } from '../models/academico.model';

@Injectable({
  providedIn: 'root',
})
export class AcademicoService {
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/academico';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  cadastrar(academico: Academico): Observable<Academico | null> {
    return this._http
      .post<Academico>(
        `${this.NEW_URL}/cadastrar`,
        JSON.stringify(academico),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Academico>) => {
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
}
