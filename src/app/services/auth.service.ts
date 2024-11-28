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
import { APP_CONFIG } from './host';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private router: Router) {}

  private ip: string = APP_CONFIG.ip;

  private NEW_URL = `http://${this.ip}:8081/academico`;
  private LOGIN_URL = `http://${this.ip}:8081/login/efetuarLogin`;
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
      // Aqui, você pode adicionar lógica adicional, como uma chamada HTTP, caso necessário
      return of(undefined); // Simplesmente retorna um Observable vazio se o token for encontrado
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

  // Quando o usuário logar, atualize o BehaviorSubject
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
            this.loadUserData(); // Carrega os dados do usuário e atualiza o BehaviorSubject
          }
        }),
        map((resp) => resp.token || null),
        catchError((err) => throwError(() => err))
      );
  }

  public loadUserData(): void {
    const username = this.getUsernameFromToken();
    if (username !== null) {
      this._http
        .get<Academico>(`${this.NEW_URL}/buscar/${username}`, this.httpOptions)
        .subscribe({
          next: (academico) => {
            this.userSubject.next(academico); // Atualiza o BehaviorSubject
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
