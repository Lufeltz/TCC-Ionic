import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonButtons,
  IonModal,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';

import { EstatisticasPessoaisComponent } from '../../components/estatisticas-pessoais/estatisticas-pessoais.component';
import { HistoricoCampeonatosComponent } from '../../components/historico-campeonatos/historico-campeonatos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConquistasComponent } from '../../components/conquistas/conquistas.component';
import { LucideAngularModule, Star } from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';

@Component({
  selector: 'app-perfil-outro-usuario',
  templateUrl: './perfil-outro-usuario.page.html',
  styleUrls: ['./perfil-outro-usuario.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    MenuPerfilComponent,
    IonButton,
    IonButtons,
    IonModal,
    EstatisticasPessoaisComponent,
    HistoricoCampeonatosComponent,
    ConquistasComponent,
    LucideAngularModule,
  ],
})
export class PerfilOutroUsuarioPage implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  pageTitle: string = 'Carlos Ribeiro';
  pageMenu: string = 'perfil-outro-usuario';
  pageContent: string = 'perfil-outro-usuario';
  username: string = '';
  idAcademico!: number;

  academico: Academico = new Academico();

  selectedSegment: string = 'estatisticas';

  readonly Star = Star;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username') || '';
    });

    this.pageTitle = this.username;
  }

  avaliarJogador() {
    this.router.navigate(['/homepage/avaliar-jogador', this.username]);
  }
}
