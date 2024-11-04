import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Bike, CalendarArrowUp, ChartColumn, GraduationCap, LucideAngularModule, Star, Trophy, UserRound } from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { AcademicoService } from 'src/app/services/academico.service';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class JogadorComponent implements OnInit, OnChanges {
  @Input() searchedJogadores!: string;
  academicos: Academico[] = [];
  public filteredJogadores: Academico[] = [];
  mensagem!: string;
  mensagem_detalhes!: string;

  readonly UserRound = UserRound;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly GraduationCap = GraduationCap;
  readonly Trophy = Trophy;
  readonly Star = Star;
  readonly Bike = Bike;

  constructor(
    private academicoService: AcademicoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchedJogadores']) {
      this.filterJogadores();
    }
  }

  getUsuarios(): void {
    this.academicoService.getAllAcademicos().subscribe({
      next: (data: Academico[] | null) => {
        if (data == null) {
          this.academicos = [];
        } else {
          this.academicos = data;
          this.filteredJogadores = data;
        }
      },
      error: (err) => {
        this.mensagem = 'Erro buscando lista de funcionários';
        this.mensagem_detalhes = `[${err.status} ${err.message}]`;
      },
    });
  }

  navigateToPerfil(): void {
    console.log('Card clicado');
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
  }
}
