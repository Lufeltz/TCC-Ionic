import { Component, ElementRef, ViewChild } from '@angular/core';
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
  IonRadio,
  IonRadioGroup,
  IonLabel,
} from '@ionic/angular/standalone';

import { Router, RouterModule } from '@angular/router';
import { AcademicoService } from 'src/app/services/academico.service';
import { Cadastro } from 'src/app/models/cadastro.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  ALargeSmall,
  AtSign,
  CalendarArrowUp,
  GraduationCap,
  Lock,
  LucideAngularModule,
  Phone,
  SaveAll,
  User,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
    IonRadio,
    IonRadioGroup,
    RouterModule,
    LucideAngularModule,
  ],
})
export class CadastroPage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private academicoService: AcademicoService
  ) {}

  @ViewChild('formCadastro') formCadastro!: NgForm;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('formLogin') formLogin!: NgForm;

  message!: string;
  academico: Cadastro = new Cadastro();
  user: Academico | null = null;

  cursos: string[] = [];
  loading: boolean = true;

  readonly SaveAll = SaveAll;
  readonly User = User;
  readonly AtSign = AtSign;
  readonly Lock = Lock;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly ALargeSmall = ALargeSmall;
  readonly Phone = Phone;
  readonly GraduationCap = GraduationCap;

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadCursos();
  }

  onTelefoneChange(event: any) {
    let input = event.target.value;

    input = input.replace(/\D/g, '');

    if (input.length > 11) {
      input = input.slice(0, 11);
    }

    this.academico.telefone = input;
  }

  formatDateToFullDate(dateString: string): string {
    const date = new Date(dateString);

    const formattedDate = date.toISOString();
    const localOffset = date.getTimezoneOffset() * 60000;

    const localDate = new Date(date.getTime() - localOffset);
    const finalDate = localDate.toISOString().split('.')[0];

    return finalDate + '-03:00';
  }

  cadastrar() {
    if (this.formLogin.valid) {
      if (this.academico.dataNascimento) {
        this.academico.dataNascimento = this.formatDateToFullDate(
          this.academico.dataNascimento
        );
      }

      this.authService.cadastrar(this.academico).subscribe({
        next: (academico) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Erro ao cadastrar acadêmico', err);
        },
      });
    } else {
      console.log('Por favor, preencha todos os campos corretamente.');
    }
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

  openDatePicker() {
    this.dateInput.nativeElement.click();
  }
}
