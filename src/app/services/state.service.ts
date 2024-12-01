import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Time } from '../models/time.model';
import { Jogador } from '../models/jogador.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // Subjects
  private updateCampeonatosSubject = new Subject<void>();
  private updateModalidadesSubject = new Subject<void>();
  private updatePublicacoesSubject = new Subject<void>();

  private updateTimesSubject = new Subject<void>();
  private updateJogadoresSubject = new Subject<void>();

  private updateMetasDiariasSubject = new Subject<void>();

  private updateMetasEsportivas = new Subject<void>();

  // Observables
  updateCampeonatos$ = this.updateCampeonatosSubject.asObservable();
  updateModalidades$ = this.updateModalidadesSubject.asObservable();
  updatePublicacoes$ = this.updatePublicacoesSubject.asObservable();

  updateTimes$ = this.updateTimesSubject.asObservable();
  updateJogadores$ = this.updateJogadoresSubject.asObservable();

  updateMetasDiarias$ = this.updateMetasDiariasSubject.asObservable();
  updateMetasEsportivas$ = this.updateMetasEsportivas.asObservable();

  // Triggers
  triggerUpdateListagemCampeonatos() {
    this.updateCampeonatosSubject.next();
  }

  triggerUpdateListagemModalidades() {
    this.updateModalidadesSubject.next();
  }

  triggerUpdateListagemPublicacoes() {
    this.updatePublicacoesSubject.next();
  }

  triggerUpdateListarMetasDiarias() {
    this.updateMetasDiariasSubject.next();
  }

  triggerUpdateListarMetasEsportivas() {
    this.updateMetasEsportivas.next();
  }


  triggerUpdateListagemTimes() {
    this.updateTimesSubject.next();
  }

  triggerUpdateListagemJogadores() {
    this.updateJogadoresSubject.next();
  }
}
