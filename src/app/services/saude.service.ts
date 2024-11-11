import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Saude } from '../models/saude.model';

@Injectable({
  providedIn: 'root',
})
export class SaudeService {
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/apoioSaude';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getContatosSaude(): Observable<Saude[] | null> {
    return this._http
      .get<Saude[]>(`${this.NEW_URL}`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Saude[]>) => {
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
}
