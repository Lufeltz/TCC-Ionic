import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-canal-saude',
  templateUrl: './canal-saude.page.html',
  styleUrls: ['./canal-saude.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CanalSaudePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
