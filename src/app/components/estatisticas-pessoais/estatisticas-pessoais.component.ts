import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EstatisticaModalidade } from 'src/app/models/estatistica-modalidade.model';
import { EstatisticaUso } from 'src/app/models/estatistica-uso.model';
import { EstatisticasAcademicoService } from 'src/app/services/estatisticas-academico.service';
import { AuthService } from 'src/app/services/auth.service'; // Importe o AuthService
import { Academico } from 'src/app/models/academico.model'; // Importe o modelo Academico
import { EstatisticaModalidadeGeral } from 'src/app/models/estatistica-modalidade-geral.model';
import {
  Award,
  CircleDashed,
  LucideAngularModule,
  MapPinPlus,
  Medal,
  SignalHigh,
  Target,
  Trophy,
} from 'lucide-angular';
import { AcademicoService } from 'src/app/services/academico.service';

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

  @Input() username: string = '';

  // Lucide Icons
  readonly CircleDashed = CircleDashed;
  readonly Target = Target;
  readonly SignalHigh = SignalHigh;
  readonly Award = Award;
  readonly Medal = Medal;
  readonly Trophy = Trophy;
  readonly MapPinPlus = MapPinPlus;

  constructor(
    private estatisticaService: EstatisticasAcademicoService,
    private authService: AuthService,
    private academicoService: AcademicoService
  ) {}

  ngOnInit() {
    // Chama a função para buscar o acadêmico com base no username
    this.buscarAcademicoPorUsername(this.username);
  }
  
  // Função para buscar o acadêmico pelo username
  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico; // Atribui o acadêmico à variável
        if (this.academico) {
          // Se o acadêmico for encontrado, carrega as estatísticas
          this.loadEstatisticasUso(this.academico.idAcademico);
          this.loadEstatisticasMetasEsportivas(this.academico.idAcademico);
        } else {
          console.error('Acadêmico não encontrado!');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      }
    });
  }

  // Função para realizar a requisição e salvar os dados de uso
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
    this.estatisticaService
      .getEstatisticasMetasEsportivas(idAcademico)
      .subscribe({
        next: (data: EstatisticaModalidadeGeral | null) => {
          this.estatisticasModalidadeGeral = data;
        },
        error: (err) => {
          console.error('Erro ao buscar dados de todas as modalidades:', err);
        },
      });
  }
}
