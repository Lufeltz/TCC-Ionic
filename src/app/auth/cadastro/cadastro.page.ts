import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonButton,
  IonItem,
  IonInput,
  IonRadio,
  IonRadioGroup,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { AcademicoService } from 'src/app/services/academico.service';
import { Academico } from 'src/app/models/academico.model';
import { AtSign, Lock, LucideAngularModule, SaveAll, User } from 'lucide-angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonIcon,
    IonButton,
    IonItem,
    IonInput,
    IonRadio,
    IonRadioGroup,
    RouterModule,
    LucideAngularModule
  ],
})
export class CadastroPage {

  readonly SaveAll = SaveAll;
  readonly User = User;
  readonly AtSign = AtSign;
  readonly Lock = Lock;

  @ViewChild('formCadastro') formCadastro!: NgForm;
  message!: string;
  academico: Academico = new Academico();

  constructor(
    private academicoService: AcademicoService,
    private router: Router
  ) {
    addIcons({ mailOutline, lockClosedOutline, personOutline });
  }

  cadastrar() {
    // if (this.formCadastro.form.valid) {
    this.academicoService.cadastrar(this.academico).subscribe({
      next: (academico) => {
        // alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Erro ao cadastrar academico', err);
        // alert('Erro ao cadastrar academico');
      },
    });
    // }
  }

  // Arrumar
  // consultarPorIdUsuario(idUsuario: number): Observable<ClienteDto | null> {
  //   return this._http
  //     .get<ClienteDto>(`${this.NEW_URL}/consultar/${idUsuario}`, this.httpOptions)
  //     .pipe(
  //       map((resp: HttpResponse<ClienteDto>) => {
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
}
