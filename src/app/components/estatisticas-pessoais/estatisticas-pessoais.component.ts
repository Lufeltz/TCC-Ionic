import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}
