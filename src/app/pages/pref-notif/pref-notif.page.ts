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
  pageTitle: string = 'Preferências';
  pageMenu: string = 'pref-notif';
  pageContent: string = 'pref-notif';

  user: Academico = new Academico();

  readonly Volleyball = Volleyball;
  readonly EyeOff = EyeOff;
  readonly SaveAll = SaveAll;

  privacidades: Privacidade = new Privacidade();

  constructor(
    private privacidadeService: PrivacidadeService,
    private authService: AuthService
  ) {}

  mostrarEstadoToggle(estado: boolean): void {
    // console.log(!estado);
  }

  ngOnInit() {
    const user = this.authService.getUser(); // Obtém o usuário autenticado
    if (user) {
      this.user = user; // Armazena o usuário
      this.getPrivacidades(this.user.idAcademico); // Passa o idAcademico do usuário
    } else {
      console.error('Usuário não autenticado');
    }
  }

  getPrivacidades(id: number) {
    this.privacidadeService.getPrivacidades(id).subscribe({
      next: (data: Privacidade | null) => {
        // Se for null, usa o valor padrão ou trata como necessário
        this.privacidades = data || new Privacidade(); // Garante que privacidades seja sempre um objeto válido
      },
      error: (err) => {
        console.error('Erro ao buscar dados de privacidade:', err);
      },
    });
  }

  atualizarPrivacidade() {
    this.privacidadeService.atualizarPrivacidade(this.privacidades).subscribe({
      next: (data) => {
        // console.log('Privacidade atualizada:', data);
        // Você pode exibir uma notificação ou atualizar o estado local do componente
      },
      error: (err) => {
        console.error('Erro ao atualizar privacidade:', err);
      },
    });
  }
}
