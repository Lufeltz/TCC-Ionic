import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ArrowDownToDot,
  Bike,
  CalendarArrowUp,
  GraduationCap,
  LucideAngularModule,
  Star,
  Trophy,
  UserRound,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { AcademicoService } from 'src/app/services/academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, LucideAngularModule],
})
export class JogadorComponent implements OnInit, OnChanges {
  @Input() searchedJogadores!: string;
  academicos: Academico[] = [];
  public filteredJogadores: Academico[] = [];
  mensagem!: string;
  mensagem_detalhes!: string;

  // Controle de carregamento de mais jogadores
  currentPage: number = 0;
  pageSize: number = 5;

  readonly UserRound = UserRound;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly GraduationCap = GraduationCap;
  readonly Trophy = Trophy;
  readonly Star = Star;
  readonly Bike = Bike;
  readonly ArrowDownToDot = ArrowDownToDot;

  constructor(
    private academicoService: AcademicoService,
    private router: Router,
    private authService: AuthService
  ) {}

  user: Academico | null = null;

  ngOnInit() {
    this.getUsuarios();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchedJogadores']) {
      this.filterJogadores();
    }
  }

  getUsuarios(): void {
    this.academicoService.getAllAcademicos(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        const data = response.content || [];  // Acesse a chave 'content' para obter o array de acadêmicos
        if (this.currentPage === 0) {
          this.academicos = data;
        } else {
          this.academicos = [...this.academicos, ...data];  // Concatenando os novos dados
        }
        this.filteredJogadores = this.academicos;
      },
      error: (err) => {
        this.mensagem = 'Erro buscando lista de acadêmicos';
        this.mensagem_detalhes = `[${err.status} ${err.message}]`;
      },
    });
  }

  loadMore(): void {
    this.currentPage++;  // Avançando para a próxima página
    this.getUsuarios();
  }

  navigateToPerfil(): void {
    this.router.navigate(['/perfil-outro-usuario']);
  }

  filterJogadores() {
    if (!this.searchedJogadores) {
      this.filteredJogadores = this.academicos;
    } else {
      const searchTerm = this.searchedJogadores.toLowerCase();
      this.filteredJogadores = this.academicos.filter(
        (jogadores) =>
          jogadores.username.toLowerCase().includes(searchTerm) ||
          jogadores.curso.toLowerCase().includes(searchTerm)
      );
    }

    // Garantir que filteredJogadores é um array
    if (!Array.isArray(this.filteredJogadores)) {
      this.filteredJogadores = [];
    }
  }

  getModalidades(academico: any): string {
    if (academico.modalidades && academico.modalidades.length > 0) {
      return academico.modalidades
        .map((modalidade: any) => modalidade.nomeModalidade)
        .join(', ');
    } else {
      return 'Sem modalidades';  // Retorna uma mensagem padrão se não houver modalidades
    }
  }
  
}
