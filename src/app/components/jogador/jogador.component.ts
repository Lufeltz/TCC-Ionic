import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Academico } from 'src/app/models/academico.model';
import { AcademicoService } from 'src/app/services/academico.service';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class JogadorComponent implements OnInit {
  academicos: Academico[] = [];
  mensagem!: string;
  mensagem_detalhes!: string;

  constructor(
    private academicoService: AcademicoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.academicoService.getAllAcademicos().subscribe({
      next: (data: Academico[] | null) => {
        if (data == null) {
          this.academicos = [];
        } else {
          this.academicos = data;
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
}
