import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import {
  AtSign,
  Cake,
  CaseSensitive,
  GraduationCap,
  Key,
  LucideAngularModule,
  Phone,
  SaveAll,
  User,
  Eye,
  EyeOff,
  UserRound,
} from 'lucide-angular';
import { AcademicoService } from 'src/app/services/academico.service';
import { Academico } from 'src/app/models/academico.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AcademicoAlteracao } from 'src/app/models/academico-alteracao.model';
@Component({
  selector: 'app-perfil-usuario-logado',
  templateUrl: './perfil-usuario-logado.page.html',
  styleUrls: ['./perfil-usuario-logado.page.scss'],
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
    LucideAngularModule,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  providers: [DatePipe],
})
export class PerfilUsuarioLogadoPage implements OnInit {
  constructor(
    private academicoService: AcademicoService,
    private authService: AuthService
  ) {}

  pageTitle: string = 'Meu Perfil';
  pageMenu: string = 'meu-perfil';
  pageContent: string = 'meu-perfil';

  academico: AcademicoAlteracao | null = null;
  showPassword: boolean = false;
  cursos: string[] = [];
  loading: boolean = true;

  user: Academico | null = null;

  readonly SaveAll = SaveAll;
  readonly GraduationCap = GraduationCap;
  readonly Phone = Phone;
  readonly AtSign = AtSign;
  readonly User = User;
  readonly Key = Key;
  readonly Cake = Cake;
  readonly CaseSensitive = CaseSensitive;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly UserRound = UserRound;

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getUsuarioLogado();
    this.loadCursos();
  }

  getUsuarioLogado() {
    this.academico = this.authService.getUser();
    if (this.academico) {
    }
  }

  originalDataNascimento: string | null = null;

  salvarDados() {
    if (this.academico && this.user!.idAcademico) {
      if (this.originalDataNascimento) {
        this.academico.dataNascimento = this.originalDataNascimento;
      }

      const dataNascimento = this.academico.dataNascimento;
      if (dataNascimento && dataNascimento !== '') {
        const dataISO = new Date(dataNascimento).toISOString();
        this.academico.dataNascimento = dataISO;
      } else {
        console.warn('Data de nascimento inválida ou vazia');
      }

      this.academicoService
        .atualizar(this.user!.idAcademico, this.academico)
        .subscribe({
          next: (data: AcademicoAlteracao | null) => {
            if (data) {
              this.academico = data;

              const toast = document.querySelector('ion-toast');
              if (toast) {
                toast.present();
              }
            } else {
              console.log('Falha ao atualizar os dados do acadêmico.');
            }
          },
          error: (err) => {
            console.error('Erro ao atualizar os dados do acadêmico:', err);
          },
        });
    } else {
      console.error(
        'Dados do acadêmico não estão completos ou acadêmico é nulo.'
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  }

  loadCursos(): void {
    this.academicoService.getCursos().subscribe({
      next: (cursos) => {
        if (cursos && cursos.length > 0) {
          this.cursos = cursos;
        } else {
          console.warn('Nenhum curso encontrado');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar cursos', err);
        this.loading = false;
      },
    });
  }
}
