import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  Award,
  CircleDashed,
  Ellipsis,
  LucideAngularModule,
  NotebookText,
  SignalHigh,
  Target,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { Conquista } from 'src/app/models/conquista.model';
import { AcademicoService } from 'src/app/services/academico.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConquistasService } from 'src/app/services/conquistas.service';
import { IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.scss'],
  standalone: true,
  imports: [IonLabel, CommonModule, LucideAngularModule],
})
export class ConquistasComponent implements OnInit {
  estatisticasEsportivas = [
    {
      esporte: 'Futebol',
      estatisticas: [
        {
          titulo: 'O Bruxo!',
          descricao: 'Ao marcar 50 gols',
          progresso: 10,
          objetivo: 50,
          completo: true,
        },
        {
          titulo: 'O Maestro dos Passes!',
          descricao: 'Ao fornecer 20 assistências decisivas',
          progresso: 5,
          objetivo: 20,
          completo: true,
        },
        {
          titulo: 'Paredão!',
          descricao: 'Ao realizar 20 defesas',
          progresso: 8,
          objetivo: 20,
          completo: false,
        },
        {
          titulo: 'Nem Neymar cobra assim!',
          descricao: 'Ao converter 5 pênaltis em gols',
          progresso: 2,
          objetivo: 5,
          completo: false,
        },
      ],
    },
    {
      esporte: 'Vôlei',
      estatisticas: [
        {
          titulo: 'A Foice!',
          descricao: 'Ao executar 30 cortes',
          progresso: 15,
          objetivo: 30,
          completo: false,
        },
        {
          titulo: 'AdBlock?!',
          descricao: 'Ao realizar 20 bloqueios',
          progresso: 10,
          objetivo: 20,
          completo: false,
        },
        {
          titulo: 'Sacou?',
          descricao: 'Ao desferir 15 saques',
          progresso: 5,
          objetivo: 15,
          completo: false,
        },
        {
          titulo: 'O Arquiteto!',
          descricao: 'Ao completar 45 levantamentos',
          progresso: 20,
          objetivo: 45,
          completo: false,
        },
      ],
    },
    {
      esporte: 'Basquete',
      estatisticas: [
        {
          titulo: 'Sextou!',
          descricao: 'Ao marcar 20 cestas de dois pontos e 20 de três pontos',
          progresso: 15,
          objetivo: 40,
          completo: false,
        },
        {
          titulo: 'Travou aqui, travou ai?!',
          descricao: 'Ao realizar 20 bloqueios',
          progresso: 10,
          objetivo: 20,
          completo: true,
        },
        {
          titulo: 'Presente professor!',
          descricao: 'Ao converter 10 pontos em faltas',
          progresso: 5,
          objetivo: 10,
          completo: true,
        },
        {
          titulo: 'O Ilusionista!',
          descricao: 'Ao driblar 50 vezes sem perder a bola',
          progresso: 30,
          objetivo: 50,
          completo: true,
        },
      ],
    },
    {
      esporte: 'Tênis de Mesa',
      estatisticas: [
        {
          titulo: 'Atura ou sutura!',
          descricao: 'Ao marcar 20 pontos',
          progresso: 10,
          objetivo: 20,
          completo: true,
        },
        {
          titulo: 'Punto e basta!',
          descricao: 'Ao conseguir 9 pontos com saques',
          progresso: 4,
          objetivo: 9,
          completo: true,
        },
        {
          titulo: 'Seis tá brincando!',
          descricao: 'Ao conquistar 30 pontos com o backhand',
          progresso: 20,
          objetivo: 30,
          completo: false,
        },
        {
          titulo: 'É o big five?',
          descricao:
            'Ao vencer 5 jogos sem deixar o adversário marcar nenhum ponto',
          progresso: 2,
          objetivo: 5,
          completo: false,
        },
      ],
    },
  ];

  modalidades: { [key: number]: string } = {
    1: 'Futebol',
    2: 'Vôlei',
    3: 'Basquete',
    4: 'Tênis de Mesa',
    5: 'Handebol',
  };

  getModalidadeName(id: number): string {
    return this.modalidades[id] || 'Desconhecido';
  }

  readonly Award = Award;
  readonly NotebookText = NotebookText;
  readonly Target = Target;
  readonly CircleDashed = CircleDashed;
  readonly SignalHigh = SignalHigh;

  academico: Academico | null = null;
  conquistas: Conquista[] = []; // Variável para armazenar as conquistas
  @Input() username: string = ''; // Recebe o username como @Input()

  constructor(
    private academicoService: AcademicoService,
    private conquistasService: ConquistasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Verifica se o 'username' foi passado via @Input
    const usernameFinal =
      this.username || this.authService.getUser()?.username || ''; // Se não for passado, tenta pegar do AuthService
    console.log(usernameFinal);
    // Se o usernameFinal não estiver vazio, tenta buscar o acadêmico
    if (usernameFinal) {
      this.buscarAcademicoPorUsername(usernameFinal);
    } else {
      console.error('Username não fornecido');
    }
  }

  // Função para buscar o acadêmico pelo username
  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico; // Atribui o acadêmico à variável
        console.log(this.academico);

        // Após ter o 'academico', busca as conquistas
        if (this.academico) {
          this.buscarConquistasPorIdAcademico(this.academico.idAcademico);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      },
    });
  }

  // Função para buscar as conquistas pelo ID do acadêmico
  buscarConquistasPorIdAcademico(idAcademico: number) {
    this.conquistasService.getConquistasByUserId(idAcademico).subscribe({
      next: (conquistas: Conquista[] | null) => {
        this.conquistas = conquistas || [];
        console.log('Conquistas recebidas:', this.conquistas);
      },
      error: (err) => {
        console.error('Erro ao buscar conquistas:', err);
      },
    });
  }
}
