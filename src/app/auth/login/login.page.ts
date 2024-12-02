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

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Lock, LogIn, LucideAngularModule, User } from 'lucide-angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/login-request';
import { Academico } from 'src/app/models/academico.model';
import { StateService } from 'src/app/services/state.service';

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
    private route: ActivatedRoute,
    private stateService: StateService
  ) {}

  @ViewChild('formLogin') formLogin!: NgForm;
  login: LoginRequest = new LoginRequest();
  loading: boolean = false;
  message!: string;

  user: Academico | null = null;

  ngOnInit(): void {
    // Verificar se o usuário está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/homepage']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.message = params['error'];
      });
    }

    // Inscrever-se no BehaviorSubject para obter as atualizações do usuário
    this.authService.user$.subscribe((user) => {
      this.user = user; // Armazenar o usuário no componente
    });
  }

  logar(): void {
    this.loading = true;
    this.authService.login(this.login).subscribe({
      next: (token) => {
        if (token) {
          const decodedToken: any = jwtDecode(token);
          console.log(token)
          // Navega para a homepage
          this.router.navigate(['/homepage']).then(() => {
            // Carregar os dados do usuário após login
            this.authService.loadUserData();
            this.stateService.triggerUpdateListagemCampeonatos();
          });
        } else {
          // Caso o token seja inválido
          this.message = 'Usuário/Senha inválidos.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;

        // Verificar o código de erro e exibir a mensagem correspondente
        if (err.status === 400) {
          this.message =
            'Erro no login. Verifique o usuário e a senha novamente.';
        } else if (err.status === 401) {
          this.message = 'Login ou senha incorretos.';
        } else {
          this.message = `Erro desconhecido: ${err.message}`;
        }
      },
    });
  }

  clearLoginError() {
    this.message = '';
  }
}
