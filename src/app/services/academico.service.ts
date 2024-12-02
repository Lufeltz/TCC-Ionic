import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Academico } from '../models/academico.model';
import { AuthService } from './auth.service';
import { AcademicoAlteracao } from '../models/academico-alteracao.model';

@Injectable({
  providedIn: 'root',
})
export class AcademicoService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/academico';

  private getHttpOptions() {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return {
      headers: headers,
      observe: 'response' as 'response',
    };
  }

  getEstatisticasPorModalidade(
    academicoId: number,
    modalidadeId: number
  ): Observable<any> {
    const url = `${this.NEW_URL}/estatisticas/${academicoId}/modalidade/${modalidadeId}`;
    return this._http.get<any>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200) {
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

  getAcademicoByUsername(username: string): Observable<Academico | null> {
    const url = `${this.NEW_URL}/buscar/${username}`;
    return this._http.get<Academico>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Academico>) => {
        if (resp.status === 200) {
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

  getAllAcademicos(page: number, size: number): Observable<Academico[] | null> {
    const url = `${this.NEW_URL}/listar?page=${page}&size=${size}&sort=curso,desc`;
    return this._http.get<Academico[]>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Academico[]>) => {
        if (resp.status === 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err) => {
        if (err.status === 404) {
          return of([]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  getAcademicoById(id: number): Observable<Academico | null> {
    return this._http
      .get<Academico>(`${this.NEW_URL}/consultar/${id}`, this.getHttpOptions())
      .pipe(
        map((resp: HttpResponse<Academico>) => {
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

  atualizar(
    id: number,
    academico: AcademicoAlteracao
  ): Observable<AcademicoAlteracao | null> {
    return this._http
      .put<AcademicoAlteracao>(
        `${this.NEW_URL}/atualizar/${id}`,
        JSON.stringify(academico),
        this.getHttpOptions()
      )
      .pipe(
        map((resp: HttpResponse<AcademicoAlteracao>) => {
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

  getCursos(): Observable<string[] | null> {
    const url = `${this.NEW_URL}/cursos/ufpr`;
    return this._http.get<string[]>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<string[]>) => {
        if (resp.status === 200) {
          return resp.body;
        } else {
          return [];
        }
      }),
      catchError((err) => {
        if (err.status === 404) {
          return of([]);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
