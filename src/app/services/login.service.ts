import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {}

  public get usuarioLogado(): LoginResponse {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: LoginResponse) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  getUsuarioLogado(): LoginResponse {
    return this.usuarioLogado;
  }

  NEW_URL = 'http://localhost:8081/login';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(loginRequest: LoginRequest): Observable<LoginResponse | null> {
    return this._http
      .post<LoginResponse>(
        `${this.NEW_URL}/efetuarLogin`,
        JSON.stringify(loginRequest),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<LoginResponse>) => {
          if (resp.status == 200) {
            console.log(resp.body);
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
