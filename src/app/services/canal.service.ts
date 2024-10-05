import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  
  constructor(private _http: HttpClient) {}

  NEW_URL = 'http://localhost:8081/canal';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // getAllClientes(): Observable<Cliente[] | null> {
  //   return this._http
  //     .get<Cliente[]>(`${this.NEW_URL}/clientes`, this.httpOptions)
  //     .pipe(
  //       map((resp: HttpResponse<Cliente[]>) => {
  //         if (resp.status == 200) {
  //           return resp.body;
  //         } else {
  //           return [];
  //         }
  //       }),
  //       catchError((err, caught) => {
  //         if (err.status == 404) {
  //           return of([]);
  //         } else {
  //           return throwError(() => err);
  //         }
  //       })
  //     );
  // }

  // getClienteById(id: number): Observable<Cliente | null> {
  //   return this._http
  //     .get<Cliente>(`${this.NEW_URL}/clientes/${id}`,this.httpOptions)
  //     .pipe(
  //       map((resp: HttpResponse<Cliente>) => {
  //         if (resp.status == 200) {
  //           return resp.body;
  //         } else {
  //           return null;
  //         }
  //       }),
  //       catchError((err, caught) => {
  //         if (err.status == 404) {
  //           return of(null);
  //         } else {
  //           return throwError(() => err);
  //         }
  //       })
  //     );
  // }

  // postCliente(funcionario: Cliente): Observable<Cliente | null> {
  //   return this._http
  //     .post<Cliente>(
  //       `${this.NEW_URL}/clientes`,
  //       JSON.stringify(funcionario),
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((resp: HttpResponse<Cliente>) => {
  //         if (resp.status == 201) {
  //           return resp.body;
  //         } else {
  //           return null;
  //         }
  //       }),
  //       catchError((err, caught) => {
  //         return throwError(() => err);
  //       })
  //     );
  // }

  // putCliente(funcionario: Cliente): Observable<Cliente | null> {
  //   return this._http
  //     .put<Cliente>(
  //       `${this.NEW_URL}/clientes/${funcionario.id}`,
  //       JSON.stringify(funcionario),
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((resp: HttpResponse<Cliente>) => {
  //         if (resp.status == 200) {
  //           return resp.body;
  //         } else {
  //           return null;
  //         }
  //       }),
  //       catchError((err, caught) => {
  //         return throwError(() => err);
  //       })
  //     );
  // }

  // deleteCliente(id: string): Observable<Cliente | null> {
  //   return this._http
  //     .delete<Cliente>(
  //       `${this.NEW_URL}/clientes/${id}`,
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((resp: HttpResponse<Cliente>) => {
  //         if (resp.status == 200) {
  //           return resp.body;
  //         } else {
  //           return null;
  //         }
  //       }),
  //       catchError((err, caught) => {
  //         return throwError(() => err);
  //       })
  //     );
  // }
}
