import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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
import { TelefoneMaskPipe } from 'src/app/pipes/telefone-mask.pipe';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.page.html',
  styleUrls: ['./estatisticas.page.scss'],
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
    TelefoneMaskPipe,
    NgxMaskPipe,
    NgxMaskDirective
  ],
  providers: [DatePipe],
})
export class EstatisticasPage implements OnInit {
  pageTitle: string = 'Meu Perfil';
  pageMenu: string = 'meu-perfil';
  pageContent: string = 'meu-perfil';

  academico: Academico | null = null; // Inicialização para null

  showPassword: boolean = false; // Variável para controlar visibilidade da senha
  cursos: string[] = [];
  loading: boolean = true;

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

  constructor(
    private academicoService: AcademicoService,
    private authService: AuthService,
    private datePipe: DatePipe, // Injetando o DatePipe
    private cdr: ChangeDetectorRef // Injeção do ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Agora os dados do acadêmico são carregados diretamente do AuthService
    this.getUsuarioLogado();
    this.loadCursos();
  }


  applyTelefoneMask(value: string): string {
    if (!value) return '';

    // Remove caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');

    // Trunca a string para garantir que tenha no máximo 11 dígitos
    const truncated = cleaned.substring(0, 11);

    // Aplica a máscara
    const match = truncated.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return truncated; // Retorna o valor truncado caso não se encaixe no formato
  }

  // formatDate(date: string): string {
  //   return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Formata a data
  // }

  originalDataNascimento: string | null = null; // Variável para armazenar a data original

  getUsuarioLogado() {
    // Acessando o usuário diretamente do AuthService
    this.academico = this.authService.getUser();
    if (this.academico) {
      // Armazenar a data de nascimento original (não formatada)
      this.originalDataNascimento = this.academico.dataNascimento;
      this.academico.telefone = this.applyTelefoneMask(this.academico.telefone)
  
      // Formatando a data para exibição (exibe como dd/MM/yyyy)
      if (this.academico.dataNascimento) {
        this.academico.dataNascimento = this.datePipe.transform(
          this.academico.dataNascimento,
          'dd/MM/yyyy'
        ) || ''; // Formata a data no formato DD/MM/YYYY
      }
    }
  }
  
  


  salvarDados() {
    if (this.academico && this.academico.idAcademico) {
      // Restaurar a data de nascimento para o formato original antes de salvar
      if (this.originalDataNascimento) {
        this.academico.dataNascimento = this.originalDataNascimento;
      }
  
      // Chamando o serviço para atualizar os dados do acadêmico
      this.academicoService
        .atualizar(this.academico.idAcademico, this.academico)
        .subscribe({
          next: (data: Academico | null) => {
            if (data) {
              // Após a atualização, aguardar 100 milissegundos e formatar novamente a data de nascimento para exibição
              setTimeout(() => {
                if (data.dataNascimento) {
                  // Atualiza o valor da data formatada para exibição no ngModel
                  this.academico!.dataNascimento = this.datePipe.transform(
                    data.dataNascimento,
                    'dd/MM/yyyy'
                  ) || '';
                }
              }, 100);  // Espera 100 milissegundos antes de atualizar a data formatada
            } else {
              console.log('Falha ao atualizar os dados do acadêmico.');
            }
          },
          error: (err) => {
            console.error('Erro ao atualizar os dados do acadêmico:', err);
          },
        });
    } else {
      console.error('Dados do acadêmico não estão completos ou acadêmico é nulo.');
    }
  }
  
  
  
  
  


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna o valor da variável
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
