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
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AcademicoAlteracao } from 'src/app/models/academico-alteracao.model';

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
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  providers: [DatePipe],
})
export class EstatisticasPage implements OnInit {
  pageTitle: string = 'Meu Perfil';
  pageMenu: string = 'meu-perfil';
  pageContent: string = 'meu-perfil';

  academico: AcademicoAlteracao | null = null;
  showPassword: boolean = false;
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

  user: Academico | null = null;

  constructor(
    private academicoService: AcademicoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getUsuarioLogado();
    this.loadCursos();
  }

  // Removido a formatação de telefone
  getUsuarioLogado() {
    this.academico = this.authService.getUser();
    if (this.academico) {
      // Agora, o telefone é mantido como está, sem qualquer formatação
    }
  }

  originalDataNascimento: string | null = null;

  salvarDados() {
    if (this.academico && this.user!.idAcademico) {
      // Restaurando a data de nascimento original para o formato correto
      if (this.originalDataNascimento) {
        this.academico.dataNascimento = this.originalDataNascimento;
      }

      // Não formatar mais a data de nascimento
      const dataNascimento = this.academico.dataNascimento;
      if (dataNascimento && dataNascimento !== '') {
        // A data é tratada como string ou no formato ISO
        const dataISO = new Date(dataNascimento).toISOString(); // Convertendo para ISO 8601
        this.academico.dataNascimento = dataISO; // Atualiza o campo com a data no formato ISO
      } else {
        console.warn('Data de nascimento inválida ou vazia');
      }

      // Logando antes de enviar os dados ao serviço
      console.log('academico sendo enviado: ', this.academico);

      // Chamando o serviço para atualizar os dados do acadêmico
      this.academicoService
        .atualizar(this.user!.idAcademico, this.academico)
        .subscribe({
          next: (data: AcademicoAlteracao | null) => {
            console.log('Resposta do servidor:', data);
            if (data) {
              // Aqui chamamos o método para atualizar os dados locais após a atualização
              this.academico = data;
              // this.getUsuarioLogado(); // Atualizando os dados do acadêmico com a resposta do backend
              console.log(this.academico)
              // Aqui, podemos exibir o toast ou mensagem de sucesso
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
