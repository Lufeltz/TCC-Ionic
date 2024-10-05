import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuPerfilComponent } from "../../components/menu-perfil/menu-perfil.component";

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MenuPerfilComponent]
})
export class ResultadosPage implements OnInit {
  pageTitle: string = 'Resultados';
  pageMenu: string = 'resultados';
  pageContent: string = 'resultados';

  constructor() { }

  ngOnInit() {
  }

}
