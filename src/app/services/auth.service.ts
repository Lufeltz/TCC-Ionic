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
  constructor(private _http: HttpClient, private router: Router) {}

  private NEW_URL = 'http://localhost:8081/academico';
  private LOGIN_URL = 'http://localhost:8081/login/efetuarLogin';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private httpOptionsCadastro = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as const,
  };

  cadastrar(academico: Cadastro): Observable<Cadastro | null> {
    return this._http
      .post<Cadastro>(
        `${this.NEW_URL}/cadastrar`,
        JSON.stringify(academico),
        this.httpOptionsCadastro
      )
      .pipe(
        map((resp: HttpResponse<Cadastro>) => {
          // Agora `resp` é do tipo `HttpResponse<Cadastro>`
          if (resp.status === 201) {
            return resp.body; // `resp.body` contém o corpo da resposta (o `Cadastro`)
          } else {
            return null; // Caso contrário, retorna `null`
          }
        }),
        catchError((err) => {
          // Lida com o erro e lança novamente
          return throwError(() => err);
        })
      );
  }

  // Método para efetuar login
  login(loginRequest: LoginRequest): Observable<string | null> {
    return this._http
      .post<LoginResponse>(this.LOGIN_URL, JSON.stringify(loginRequest), {
        headers: this.httpOptions.headers,
        observe: 'body',
      })
      .pipe(
        tap(() => {
          console.log('Dados de login enviados:', loginRequest);
        }),
        map((resp) => {
          if (resp.token) {
            localStorage.setItem('jwt', resp.token); // Armazenando o token
            return resp.token;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          console.error('Erro no login:', err);
          return throwError(() => err);
        })
      );
  }

  // Método para realizar logout
  logout(): void {
    localStorage.removeItem('jwt'); // Removendo o token do localStorage
    this.router.navigate(['/login']); // Redirecionando para a tela de login
  }

  // Método para obter o token JWT
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Método para verificar se o usuário está autenticado (token não nulo e não expirado)
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      // Verificando se o token está expirado
      if (this.isTokenExpired(token)) {
        this.logout(); // Caso tenha expirado, efetua o logout e redireciona para o login
        return false;
      }
      return true; // Caso o token não tenha expirado
    }
    return false; // Caso o token seja nulo
  }

  // Método para verificar se o token JWT expirou
  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      return decodedToken.exp < currentTime; // Se o exp for menor que o tempo atual, o token expirou
    } catch (error) {
      return true; // Se houver erro ao decodificar o token, consideramos que ele expirou
    }
  }

  // Método para obter o ID do usuário do token JWT
  private getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken.idUsuario);
        return decodedToken.idUsuario; // Supondo que o ID esteja no payload com a chave "id"
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    return null;
  }

  // Método para obter os dados do acadêmico logado
  getAcademicoLogado(): Observable<Academico | null> {
    const userId = this.getUserIdFromToken();
    if (userId !== null) {
      return this._http
        .get<Academico>(`${this.NEW_URL}/consultar/${userId}`, this.httpOptions)
        .pipe(
          map((academico: Academico) => {
            return academico;
          }),
          catchError((err) => {
            console.error('Erro ao obter acadêmico:', err);
            return throwError(() => err);
          })
        );
    } else {
      console.error('Usuário não autenticado ou token inválido');
      return of(null); // Retorna null se não houver token válido
    }
  }
}
