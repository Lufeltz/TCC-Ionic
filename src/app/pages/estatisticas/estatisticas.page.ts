import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { AtSign, CaseSensitive, GraduationCap, LucideAngularModule, Phone, SaveAll, User } from 'lucide-angular';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.page.html',
  styleUrls: ['./estatisticas.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonInput,
    IonButton,
    IonLabel,
    IonSegmentButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    LucideAngularModule
  ],
})
export class EstatisticasPage implements OnInit {
  pageTitle: string = 'Meu Perfil';
  pageMenu: string = 'meu-perfil';
  pageContent: string = 'meu-perfil';

  readonly SaveAll = SaveAll;
  readonly GraduationCap = GraduationCap;
  readonly Phone = Phone;
  readonly AtSign = AtSign;
  readonly User = User;
  readonly CaseSensitive = CaseSensitive;

  usuario = {
    nome: 'Carlos Ribeiro',
    username: 'carlosr',
    email: 'carlos.ribeiro@example.com',
    telefone: '(11) 99999-9999',
    curso: 'Análise e Desenvolvimento de Sistemas',
  };

  salvarDados() {
    // Lógica para salvar os dados do usuário
    console.log('Dados do usuário salvos:', this.usuario);
    // Aqui você pode chamar um serviço para enviar os dados para um backend
  }

  constructor() {}

  ngOnInit() {}
}
