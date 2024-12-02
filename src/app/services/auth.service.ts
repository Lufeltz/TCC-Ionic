import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
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
  constructor(private _http: HttpClient, private router: Router) {}

  private NEW_URL = 'http://localhost:8081/academico';
  private LOGIN_URL = 'http://localhost:8081/login/efetuarLogin';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private userSubject: BehaviorSubject<Academico | null> =
    new BehaviorSubject<Academico | null>(null);
  user$ = this.userSubject.asObservable();

  private user: Academico | null = null;

  loadToken(): Observable<void> {
    const token = localStorage.getItem('jwt');
    if (token) {
      return of(undefined);
    }
    return throwError(() => new Error('Token não encontrado.'));
  }

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
        map((resp) => resp.token || null),
        catchError((err) => throwError(() => err))
      );
  }

  public loadUserData(): void {
    const username = this.getUsernameFromToken();
    if (username !== null) {
      const token = this.getToken();
      const headers = this.httpOptions.headers.set(
        'Authorization',
        `Bearer ${token}`
      );

      this._http
        .get<Academico>(`${this.NEW_URL}/buscar/${username}`, { headers })
        .subscribe({
          next: (academico) => {
            this.userSubject.next(academico);
            localStorage.setItem('user', JSON.stringify(academico));
          },
          error: (err) => {
            console.error('Erro ao obter os dados do usuário:', err);
          },
        });
    }
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
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

  private getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    return null;
  }
}
