import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonToast } from '@ionic/angular/standalone';
import { MenuPerfilComponent } from "../../components/menu-perfil/menu-perfil.component";

@Component({
  selector: 'app-canal-saude',
  templateUrl: './canal-saude.page.html',
  styleUrls: ['./canal-saude.page.scss'],
  standalone: true,
  imports: [IonToast, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuPerfilComponent]
})
export class CanalSaudePage implements OnInit {
  pageTitle: string = 'Canal Saúde';
  pageMenu: string = 'canal-saude';
  pageContent: string = 'canal-saude';

  constructor() { }

  ngOnInit() {
  }

}
