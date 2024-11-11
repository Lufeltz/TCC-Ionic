import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';
import { EstatisticaUso } from 'src/app/models/estatistica-uso.model';
import { EstatisticasAcademicoService } from 'src/app/services/estatisticas-academico.service';

@Component({
  selector: 'app-estatisticas-pessoais',
  templateUrl: './estatisticas-pessoais.component.html',
  styleUrls: ['./estatisticas-pessoais.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class EstatisticasPessoaisComponent implements OnInit {
  usuario = {
    nome: 'Carlos Ribeiro',
    idade: 30,
    peso: 70,
    altura: 1.75,
    estatisticasPessoais: {
      metasConcluidas: 15,
      metasDiariasEmAndamento: 13,
      metasDiariasConcluidas: 5,
      totalMetas: 30,
      metasMensais: {
        total: 25,
        concluidas: 10,
        emAndamento: 5,
      },
      progressoGeral: 75, // Porcentagem de progresso
      defesas: 20,
      golsMarcados: 10,
      assistencias: 5,
      jogosJogados: 18,
      vitorias: 12,
      derrotas: 4,
      empates: 2,
    },
  };

  estatisticasUso: EstatisticaUso[] = [];
  estatisticasModalidade: EstatisticaModalidade[] = [];

  constructor(private estatisticaService: EstatisticasAcademicoService) {}

  ngOnInit() {
    // Chama a função que realiza a requisição e salva os dados
    this.loadEstatisticasUso(1);
    this.loadEstatisticasModalidade(1, 1); // Exemplo de IDs
  }

  // Função para realizar a requisição e salvar os dados
  loadEstatisticasUso(id: number) {
    this.estatisticaService.getEstatisticasUso(id).subscribe({
      next: (data: EstatisticaUso[] | null) => {
        this.estatisticasUso = data || [];
        console.log(
          'Dados de estatísticas de uso recebidos:',
          this.estatisticasUso
        );
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
          this.estatisticasModalidade = data || [];
          console.log(
            'Dados de estatísticas de modalidade recebidos:',
            this.estatisticasModalidade
          );
        },
        error: (err) => {
          console.error(
            'Erro ao buscar dados de estatísticas de modalidade:',
            err
          );
        },
      });
  }
}
