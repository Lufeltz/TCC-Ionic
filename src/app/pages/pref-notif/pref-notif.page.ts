import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonLabel,
  IonText,
  IonToast,
  IonButton,
} from '@ionic/angular/standalone';

import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  EyeOff,
  LucideAngularModule,
  SaveAll,
  Volleyball,
} from 'lucide-angular';
import { PrivacidadeService } from 'src/app/services/privacidade.service';
import { Privacidade } from 'src/app/models/privacidade.model';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';

@Component({
  selector: 'app-pref-notif',
  templateUrl: './pref-notif.page.html',
  styleUrls: ['./pref-notif.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonToggle,
    IonLabel,
    IonText,
    IonToast,
    LucideAngularModule,
  ],
})
export class PrefNotifPage implements OnInit {
  constructor(
    private privacidadeService: PrivacidadeService,
    private authService: AuthService
  ) {}

  pageTitle: string = 'Preferências';
  pageMenu: string = 'pref-notif';
  pageContent: string = 'pref-notif';
  privacidades: Privacidade = new Privacidade();

  user: Academico = new Academico();

  readonly Volleyball = Volleyball;
  readonly EyeOff = EyeOff;
  readonly SaveAll = SaveAll;

  mostrarEstadoToggle(estado: boolean): void {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
      this.getPrivacidades(this.user.idAcademico);
    } else {
      console.error('Usuário não autenticado');
    }
  }

  getPrivacidades(id: number) {
    this.privacidadeService.getPrivacidades(id).subscribe({
      next: (data: Privacidade | null) => {
        this.privacidades = data || new Privacidade();
      },
      error: (err) => {
        console.error('Erro ao buscar dados de privacidade:', err);
      },
    });
  }

  atualizarPrivacidade() {
    this.privacidadeService.atualizarPrivacidade(this.privacidades).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error('Erro ao atualizar privacidade:', err);
      },
    });
  }
}
