import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';
import { EstatisticaUso } from 'src/app/models/estatistica-uso.model';
import { EstatisticasAcademicoService } from 'src/app/services/estatisticas-academico.service';
import { AuthService } from 'src/app/services/auth.service'; // Importe o AuthService
import { Academico } from 'src/app/models/academico.model'; // Importe o modelo Academico
import { EstatisticaModalidadeGeral } from 'src/app/models/estatistica-modalidade-geral.model';
import { CircleDashed, LucideAngularModule, SignalHigh, Target } from 'lucide-angular';


@Component({
  selector: 'app-estatisticas-pessoais',
  templateUrl: './estatisticas-pessoais.component.html',
  styleUrls: ['./estatisticas-pessoais.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class EstatisticasPessoaisComponent implements OnInit {
  estatisticasUso: EstatisticaUso[] = [];
  estatisticasModalidadeUnica: EstatisticaModalidade[] = [];
  estatisticasModalidadeGeral: EstatisticaModalidadeGeral | null = null; // Alterado para ser um único objeto
  academico: Academico | null = null; // Variável para armazenar os dados do acadêmico logado

  readonly CircleDashed =CircleDashed;
  readonly Target =Target;
  readonly SignalHigh =SignalHigh;

  constructor(
    private estatisticaService: EstatisticasAcademicoService,
    private authService: AuthService // Injeção do AuthService
  ) {}

  ngOnInit() {
    // Obter dados do acadêmico logado
    this.authService.getAcademicoLogado().subscribe({
      next: (data: Academico | null) => {
        this.academico = data;
        console.log('Dados do acadêmico logado:', this.academico);

        // Se academico não for null, carregar estatísticas
        if (this.academico) {
          this.loadEstatisticasUso(this.academico.idAcademico);
          this.loadEstatisticasMetasEsportivas(this.academico.idAcademico);
        }
      },
      error: (err) => {
        console.error('Erro ao obter dados do acadêmico logado:', err);
      },
    });
  }

  // Função para realizar a requisição e salvar os dados
  loadEstatisticasUso(id: number) {
    this.estatisticaService.getEstatisticasUso(id).subscribe({
      next: (data: EstatisticaUso[] | null) => {
        this.estatisticasUso = data || [];
      },
      error: (err) => {
        console.error('Erro ao buscar dados de estatísticas de uso:', err);
      },
    });
  }

  // Função para realizar a requisição e salvar os dados de modalidade
  loadEstatisticasModalidade(idAcademico: number, idModalidade: number) {
    this.estatisticaService
      .getEstatisticasModalidade(idAcademico, idModalidade)
      .subscribe({
        next: (data: EstatisticaModalidade[] | null) => {
          const estatisticas = data || [];
          this.estatisticasModalidadeUnica.push(...estatisticas);
          console.log(
            `Dados de estatísticas de modalidade recebidos para modalidade ${idModalidade}:`,
            estatisticas
          );
        },
        error: (err) => {
          console.error(
            `Erro ao buscar dados de estatísticas de modalidade para modalidade ${idModalidade}:`,
            err
          );
        },
      });
  }

  // Função para realizar a requisição e salvar os dados de todas as modalidades
  loadEstatisticasMetasEsportivas(idAcademico: number) {
    this.estatisticaService.getEstatisticasMetasEsportivas(idAcademico).subscribe({
      next: (data: EstatisticaModalidadeGeral | null) => {
        this.estatisticasModalidadeGeral = data;
        console.log('Dados de todas as modalidades recebidos:', this.estatisticasModalidadeGeral);
      },
      error: (err) => {
        console.error('Erro ao buscar dados de todas as modalidades:', err);
      },
    });
  }
}
