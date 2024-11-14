import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  schoolOutline,
  notificationsOutline,
  eyeOffOutline,
  settingsOutline,
  bicycleOutline,
  addCircleOutline,
  starOutline,
  calendarNumberOutline,
  logOutOutline,
  medkitOutline,
  analyticsOutline,
} from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import {
  Bell,
  Calendar1,
  ChartNoAxesCombined,
  DiamondPlus,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  LogOut,
  LucideAngularModule,
  MessageCirclePlus,
  Settings,
  ShieldPlus,
  Star,
  User,
} from 'lucide-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonIcon,
    RouterModule,
    LucideAngularModule,
  ],
})
export class MenuPerfilComponent implements OnInit {
  @Input() title: string = '';
  @Input() menu: string = '';
  @Input() menuContentId: string = '';

  readonly User = User;
  readonly GraduationCap = GraduationCap;
  readonly Bell = Bell;
  readonly ShieldPlus = ShieldPlus;
  readonly HeartPulse = HeartPulse;
  readonly ChartNoAxesCombined = ChartNoAxesCombined;
  readonly Settings = Settings;
  readonly Calendar1 = Calendar1;
  readonly DiamondPlus = DiamondPlus;
  readonly Dumbbell = Dumbbell;
  readonly Star = Star;
  readonly LogOut = LogOut;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
