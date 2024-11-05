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
import { LoginService } from 'src/app/services/login.service';
import { AcademicoService } from 'src/app/services/academico.service';
import { LoginRequest } from 'src/app/models/login-request.model';
import { jwtDecode } from 'jwt-decode';
import { Lock, LucideAngularModule, User } from 'lucide-angular';

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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private academicoService: AcademicoService
  ) {
    addIcons({ mailOutline, lockClosedOutline });
  }

  @ViewChild('formLogin') formLogin!: NgForm;
  login: LoginRequest = new LoginRequest();
  loading: boolean = false;
  message!: string;

  loginError: boolean = false;

  ngOnInit(): void {
    // if (this.loginService.usuarioLogado || true) {
    if (true) {
      this.router.navigate(['/login']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.message = params['error'];
      });
    }
  }

  logar(): void {
    this.loading = true;
    if (true) {
      this.router.navigate(['/homepage']);
    } else {
      // if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe({
        next: (token) => {
          if (token != null) {
            // Decodificando o token JWT
            const decodedToken: any = jwtDecode(JSON.stringify(token));
            console.log(decodedToken);

            this.loginService.usuarioLogado = decodedToken.sub;

            this.loading = false;
            if (decodedToken.role == 'ACADEMICO' || true) {
              // this.clienteService.consultarPorIdUsuario(decodedToken.idUsuario)
              this.router.navigate(['/homepage']);
              console.log('ACADEMICO');
            } else if (decodedToken.role == 'ADMINISTRADOR') {
              // this.clienteService.consultarPorIdUsuario(decodedToken.idUsuario)
              // this.router.navigate(['/homepage-cliente']);
              console.log('ADMINISTRADOR');
            } else if (decodedToken.role == 'ADMINISTRADOR_MASTER') {
              // this.clienteService.consultarPorIdUsuario(decodedToken.idUsuario)
              // this.router.navigate(['/homepage-cliente']);
              console.log('ADMINISTRADOR_MASTER');
            }
          } else {
            this.message = 'Usuário/Senha invállidos.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.message = `Erro efetuando login: ${err.message}`;
        },
      });
      // } else {
      this.loading = false;
    }
  }

  clearLoginError() {
    this.loginError = false;
  }
}
