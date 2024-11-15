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
    private datePipe: DatePipe // Injetando o DatePipe
  ) {}

  ngOnInit() {
    // Agora os dados do acadêmico são carregados diretamente do AuthService
    this.getUsuarioLogado();
    this.loadCursos();
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Formata a data
  }

  getUsuarioLogado() {
    // Acessando o usuário diretamente do AuthService
    this.academico = this.authService.getUser();
    if (this.academico) {
      console.log('Dados do acadêmico logado:', this.academico);
    } else {
      console.error('Usuário não autenticado ou dados não carregados');
    }
  }

  carregarDadosUsuario(id: number) {
    // Agora, não é necessário carregar os dados de novo do serviço, pois já estão disponíveis
    console.log('Dados do acadêmico já carregados:', this.academico);
  }

  salvarDados() {
    if (this.academico && this.academico.idAcademico) {
      // Chamando o serviço para atualizar os dados do acadêmico
      this.academicoService
        .atualizar(this.academico.idAcademico, this.academico)
        .subscribe({
          next: (data: Academico | null) => {
            if (data) {
              console.log('Dados do acadêmico atualizados:', data);
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
    this.showPassword = !this.showPassword; // Alterna o valor da variável
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Modalidade selecionada:', selectedValue);
  }

  loadCursos(): void {
    this.academicoService.getCursos().subscribe({
      next: (cursos) => {
        if (cursos && cursos.length > 0) {
          this.cursos = cursos;
          console.log(this.cursos);
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
