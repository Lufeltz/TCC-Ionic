import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  Smartphone,
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
  readonly SaveAll = SaveAll;
  readonly User = User;
  readonly AtSign = AtSign;
  readonly Lock = Lock;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly ALargeSmall = ALargeSmall;
  readonly Phone = Phone;
  readonly GraduationCap = GraduationCap;

  @ViewChild('formCadastro') formCadastro!: NgForm;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('formLogin') formLogin!: NgForm; // Referência ao formulário

  message!: string;
  academico: Cadastro = new Cadastro();
  user: Academico | null = null;

  cursos: string[] = [];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private academicoService: AcademicoService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadCursos();
  }

  onTelefoneChange(event: any) {
    let input = event.target.value;

    // Remover qualquer caractere não numérico
    input = input.replace(/\D/g, ''); // Substitui tudo que não for número por nada

    // Limitar o comprimento do número para 11 caracteres (como o formato 41999999999)
    if (input.length > 11) {
      input = input.slice(0, 11); // Limita a quantidade de caracteres para 11
    }

    // Atualiza o valor no modelo
    this.academico.telefone = input;
  }

  // Removido a formatação de telefone

  // Método para formatar a data
  formatDateToFullDate(dateString: string): string {
    const date = new Date(dateString); // Cria um objeto Date a partir da string

    // Formatação manual para adicionar o fuso horário e os milissegundos
    const formattedDate = date.toISOString(); // Formata para o formato UTC ISO
    const localOffset = date.getTimezoneOffset() * 60000; // Calcula o offset do fuso horário

    const localDate = new Date(date.getTime() - localOffset); // Ajusta a data para o horário local
    const finalDate = localDate.toISOString().split('.')[0]; // Remove milissegundos e finaliza a formatação

    // Retorna a data no formato desejado
    return finalDate + '-03:00'; // Adiciona o fuso horário de Brasília
  }

  // Função chamada ao clicar em Registrar
  cadastrar() {
    // Se o formulário for válido, envia os dados
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
    // Simula o clique no campo de data
    this.dateInput.nativeElement.click();
  }
}
