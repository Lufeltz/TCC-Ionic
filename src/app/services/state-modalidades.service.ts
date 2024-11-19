import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateModalidadesService {

    // Um Subject para emitir eventos de atualização
    private updateModalidadesSubject = new Subject<void>();

    // Um Observable para que os componentes possam se inscrever
    updateModalidades$ = this.updateModalidadesSubject.asObservable();
  
    // Método para disparar o evento de atualização
    triggerUpdate() {
      this.updateModalidadesSubject.next();
    }
}
