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
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AcademicoService } from 'src/app/services/academico.service';
import { jwtDecode } from 'jwt-decode';
import {
  Lock,
  LogIn,
  LucideAngularModule,
  RotateCw,
  User,
} from 'lucide-angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    RouterModule,
    LucideAngularModule,
  ],
})
export class LoginPage implements OnInit {
  readonly Lock = Lock;
  readonly User = User;
  readonly LogIn = LogIn;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  

  @ViewChild('formLogin') formLogin!: NgForm;
  login: LoginRequest = new LoginRequest();
  loading: boolean = false;
  message!: string;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/homepage']);
    } else {
      // Captura a mensagem de erro da query params, se existir
      this.route.queryParams.subscribe((params) => {
        this.message = params['error']; // A mensagem que o AuthGuard passa
      });
    }
  }

  logar(): void {
    this.loading = true;
    this.authService.login(this.login).subscribe({
      next: (token) => {
        if (token) {
          const decodedToken: any = jwtDecode(token);
          console.log(decodedToken);
          this.router.navigate(['/homepage']);
        } else {
          this.message = 'Usuário/Senha inválidos.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.message = `Erro efetuando login: ${err.message}`;
      },
    });
  }

  clearLoginError() {
    this.message = '';
  }
}
