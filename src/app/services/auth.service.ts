import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cadastro } from '../models/cadastro.model';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { jwtDecode } from 'jwt-decode';
import { Academico } from '../models/academico.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private NEW_URL = 'http://localhost:8081/academico';
  private LOGIN_URL = 'http://localhost:8081/login/efetuarLogin';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private user: Academico | null = null;

  constructor(private _http: HttpClient, private router: Router) {}

  cadastrar(academico: Cadastro): Observable<Cadastro | null> {
    return this._http
      .post<Cadastro>(`${this.NEW_URL}/cadastrar`, JSON.stringify(academico), {
        headers: this.httpOptions.headers,
        observe: 'response' as const,
      })
      .pipe(
        map((resp: HttpResponse<Cadastro>) => {
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

  login(loginRequest: LoginRequest): Observable<string | null> {
    return this._http
      .post<LoginResponse>(this.LOGIN_URL, JSON.stringify(loginRequest), {
        headers: this.httpOptions.headers,
        observe: 'body',
      })
      .pipe(
        tap((resp) => {
          if (resp.token) {
            localStorage.setItem('jwt', resp.token);
            this.loadUserData();
          }
        }),
        map((resp) => {
          if (resp.token) {
            return resp.token;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }

  private loadUserData(): void {
    const username = this.getUsernameFromToken();
    if (username !== null) {
      this._http
        .get<Academico>(`${this.NEW_URL}/buscar/${username}`, this.httpOptions)
        .subscribe({
          next: (academico) => {
            this.user = academico;
            localStorage.setItem('user', JSON.stringify(academico));
          },
          error: (err) => {
            console.error('Erro ao obter os dados do usuário:', err);
          },
        });
    }
  }

  getUser(): Academico | null {
    if (this.user) {
      return this.user;
    }
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      if (this.isTokenExpired(token)) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // New method to get the username from the token
  private getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub; // Getting 'sub' (username) from the token
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    return null;
  }
}
