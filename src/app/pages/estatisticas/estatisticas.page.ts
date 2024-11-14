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

  academico: Academico | null = new Academico(); // Usando o construtor da classe Academico

  showPassword: boolean = false; // Variável para controlar visibilidade da senha

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
    // Carregar os dados do acadêmico com o id desejado (exemplo: 1)
    this.getUsuarioLogado();
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Formata a data
  }

  getUsuarioLogado() {
    this.authService.getAcademicoLogado().subscribe({
      next: (academico) => {
        this.academico = academico;
        console.log('Dados do acadêmico logado:', this.academico);
      },
      error: (error) => {
        console.error('Erro ao obter os dados do acadêmico logado:', error);
      },
    });
  }

  carregarDadosUsuario(id: number) {
    this.academicoService.getAcademicoById(id).subscribe({
      next: (data) => {
        this.academico = data!;
        console.log('Dados do acadêmico carregados:', this.academico);
      },
      error: (err) => {
        console.error('Erro ao carregar dados do acadêmico:', err);
      },
    });
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
}
