import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CriarTime } from '../models/criar-time.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Time } from '../models/time.model';
import { Jogador } from '../models/jogador.model';
import { JogadorResponse } from '../models/jogador-response.model';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  constructor(private _http: HttpClient, private authService: AuthService) {}

  NEW_URL = 'http://localhost:8081/campeonatos/times'; // Atualize para o novo endpoint
  BASE_URL = 'http://localhost:8081/campeonatos';

  // Função para obter o token e adicionar ao cabeçalho
  private getHttpOptions() {
    const token = this.authService.getToken(); // Obtém o token do AuthService
    const headers = token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho Authorization
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });

    return {
      headers: headers,
      observe: 'response' as 'response',
    };
  }

  // Novo método para criar um time individual para o usuário
// Novo método para criar um time individual para o usuário
criarTimeIndividual(
  idCampeonato: number,
  idUsuario: number,
  senha?: string
): Observable<any> {
  // Modificando a URL para refletir o formato correto
  const url = `${this.BASE_URL}/${idCampeonato}/times/${idUsuario}`;

  // Se a senha for fornecida, envia ela diretamente, sem envolver em um objeto
  const body = senha ? senha : {};
  console.log('senha recebida no service', senha)
  console.log('idcampeonato no service', idCampeonato)
  console.log('idUsuario no service', idUsuario)

  return this._http.post(url, body, this.getHttpOptions()).pipe(
    map((resp: HttpResponse<any>) => {
      if (resp.status === 201) {
        return resp.body; // Retorna a resposta do corpo da requisição
      } else {
        return null; // Caso não tenha sucesso
      }
    }),
    catchError((err) => {
      return throwError(() => err); // Retorna o erro em caso de falha
    })
  );
}

  

  // Função para inscrever um time em um campeonato
  inscreverTime(time: CriarTime): Observable<any> {
    const url = `${this.NEW_URL}`;
    return this._http.post(url, time, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
          return resp.body; // Retorna a resposta do corpo da requisição
        } else {
          return null; // Caso não tenha sucesso
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Novo método para salvar a pontuação de uma partida
  salvarPontuacao(partida: Partida): Observable<any> {
    const url = `${this.BASE_URL}/partidas/${partida.idPartida}/pontuacao?pontuacaoTime1=${partida.resultado?.pontuacaoTime1}&pontuacaoTime2=${partida.resultado?.pontuacaoTime2}`;
    return this._http.put(url, {}, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200 || resp.status === 201) {
          return resp.body; // Retorna a resposta do corpo da requisição
        } else {
          return null; // Caso não tenha sucesso
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Novo método para iniciar a primeira fase de um campeonato
  iniciarPrimeiraFase(idCampeonato: number): Observable<any> {
    const url = `${this.BASE_URL}/${idCampeonato}/primeira-fase`;
    return this._http.post(url, {}, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201 || resp.status === 200) {
          return resp.body; // Retorna a resposta do corpo da requisição
        } else {
          return null; // Caso não tenha sucesso
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Novo método para avançar a fase de um campeonato
  avancarFase(idCampeonato: number): Observable<any> {
    const url = `${this.BASE_URL}/${idCampeonato}/avancar-fase`;
    return this._http.post(url, {}, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 200 || resp.status === 201) {
          return resp.body; // Retorna a resposta do corpo da requisição
        } else {
          return null; // Caso não tenha sucesso
        }
      }),
      catchError((err) => {
        if (err.status === 404) {
          console.error('Campeonato não encontrado');
          return throwError(() => new Error('Campeonato não encontrado'));
        } else {
          return throwError(() => err); // Retorna o erro em caso de falha
        }
      })
    );
  }

  // Função para listar times de um campeonato
  listarTimes(idCampeonato: number): Observable<Time[]> {
    const url = `${this.BASE_URL}/${idCampeonato}/times`;
    return this._http.get<Time[]>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<Time[]>) => {
        if (resp.status === 200) {
          return resp.body || []; // Retorna a lista de times
        } else {
          return []; // Retorna uma lista vazia em caso de falha
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Função para listar jogadores de um campeonato
  listarJogadores(idCampeonato: number): Observable<JogadorResponse> {
    const url = `${this.BASE_URL}/${idCampeonato}/jogadores`;
    return this._http.get<JogadorResponse>(url, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<JogadorResponse>) => {
        if (resp.status === 200) {
          return resp.body || new JogadorResponse(); // Retorna o objeto JogadorResponse ou um novo objeto com valores padrão
        } else {
          return new JogadorResponse(); // Retorna um novo objeto JogadorResponse com valores padrão
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Função para adicionar um usuário a um time
  adicionarUsuarioAoTime(idUsuario: number, time: Time): Observable<any> {
    const url = `${this.NEW_URL}/${idUsuario}`;
    return this._http.post(url, time, this.getHttpOptions()).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
          return resp.body; // Retorna a resposta do corpo da requisição
        } else {
          return null; // Caso não tenha sucesso
        }
      }),
      catchError((err) => {
        return throwError(() => err); // Retorna o erro em caso de falha
      })
    );
  }

  // Novo método para listar partidas de um campeonato
  listarPartidas(idCampeonato: number): Observable<Partida[]> {
    const url = `${this.BASE_URL}/${idCampeonato}/partidas`;
    return this._http
      .get<Partida[]>(url, { ...this.getHttpOptions(), observe: 'response' })
      .pipe(
        map((resp: HttpResponse<Partida[]>) => {
          if (resp.status === 200) {
            return resp.body || []; // Retorna a lista de partidas
          } else {
            return []; // Retorna uma lista vazia em caso de falha
          }
        }),
        catchError((err) => {
          if (err.status === 404) {
            console.error('Nenhuma partida encontrada para este campeonato');
            // Você pode retornar um erro específico ou uma mensagem vazia, como preferir
            return of([]); // Retorna um Observable de uma lista vazia
          } else {
            return throwError(() => err); // Retorna o erro em caso de falha
          }
        })
      );
  }
}
