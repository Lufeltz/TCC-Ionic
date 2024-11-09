import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToggle,
  IonItem,
  IonToast,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonIcon,
  IonList,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import {
  BicepsFlexed,
  CaseUpper,
  ChevronDown,
  CircleX,
  Clock4,
  LucideAngularModule,
  NotebookText,
  Pencil,
  SquareCheckBig,
  SquarePen,
  Target,
  Trash2,
} from 'lucide-angular';
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';

interface Meta {
  tipo: 'diaria' | 'esportiva';
  nome?: string;
  esporte?: string;
  opcoes?: string[];
  metas?: string[];
}

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonIcon,
    IonAccordion,
    IonAccordionGroup,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    IonButton,
    IonToast,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonSegmentButton,
    IonLabel,
    IonSegment,
    IonToggle,
    LucideAngularModule,
  ],
})
export class MetasPage implements OnInit {
  pageTitle: string = 'Metas';
  pageMenu: string = 'metas-menu';
  pageContent: string = 'metas';

  selectedSegment: string = 'criacao';
  filterEsportivas: boolean = false;
  filterDiarias: boolean = true;

  idAcademico: number = 1; // definir o valor da variável aqui
  metaDiaria: MetaDiaria = new MetaDiaria();
  metaDiaria2: MetaDiaria = new MetaDiaria();

  constructor(private metaDiariaService: MetaDiariaService) {}
  
  ngOnInit(): void {
    this.metaDiariaService.getMetaDiariaByAcademicoId(this.idAcademico).subscribe({
      next: (data) => {
        this.metaDiaria = data || new MetaDiaria(); // Garantir que metaDiaria nunca seja null
        console.log(this.metaDiaria);
      },
      error: (err) => {
        console.error('Erro ao buscar meta diária:', err);
      }
    });
  }

  salvarDados(): void {
    if (this.metaDiaria2) {
      // Certifique-se de que o idAcademico está sendo atribuído corretamente
      this.metaDiaria2.idAcademico = this.idAcademico; 
  
      console.log('MetaDiaria antes de salvar:', this.metaDiaria2);  // Verifique os valores no console
  
      this.metaDiariaService.postMetaDiaria(this.metaDiaria2).subscribe({
        next: (data) => {
          console.log('Meta Diária criada com sucesso:', data);
        },
        error: (err) => {
          console.error('Erro ao criar Meta Diária:', err);
          console.log('MetaDiaria:', this.metaDiaria2);  // Veja o conteúdo do objeto enviado
        }
      });
    }
  }
  
  

  readonly Clock4 = Clock4;
  readonly BicepsFlexed = BicepsFlexed;
  readonly Pencil = Pencil;
  readonly Target = Target;
  readonly SquarePen = SquarePen;
  readonly SquareCheckBig = SquareCheckBig;
  readonly Trash2 = Trash2;
  readonly CaseUpper = CaseUpper;
  readonly NotebookText = NotebookText;
  readonly ChevronDown = ChevronDown;

  metasDiarias: Meta[] = [
    {
      tipo: 'diaria',
      nome: 'Beber água',
      opcoes: ['1L', '2L', '3L'],
    },
    {
      tipo: 'diaria',
      nome: 'Comer uma fruta',
      opcoes: ['1 fruta', '2 frutas'],
    },
    {
      tipo: 'diaria',
      nome: 'Ler páginas de um livro',
      opcoes: ['5 páginas', '7 páginas', '10 páginas'],
    },
    {
      tipo: 'diaria',
      nome: 'Dar uma quantidade específica de passos',
      opcoes: ['50 passos', '200 passos', '500 passos'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer polichinelos',
      opcoes: ['15 polichinelos', '30 polichinelos', '45 polichinelos'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer flexões',
      opcoes: ['5 flexões', '8 flexões', '12 flexões'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer abdominais',
      opcoes: ['10 abdominais', '20 abdominais', '30 abdominais'],
    },
    {
      tipo: 'diaria',
      nome: 'Meditar',
      opcoes: ['5 minutos', '10 minutos', '20 minutos'],
    },
    {
      tipo: 'diaria',
      nome: 'Fazer caminhada',
      opcoes: ['15 minutos', '30 minutos', '1 hora'],
    },
    {
      tipo: 'diaria',
      nome: 'Escrever no diário',
      opcoes: ['1 página', '2 páginas', '3 páginas'],
    },
  ];

  metasEsportivas: Meta[] = [
    {
      tipo: 'esportiva',
      esporte: 'Futebol',
      metas: [
        'Gols feitos',
        'Assistências feitas',
        'Defesas feitas',
        'Gols de pênalti',
        'Conquistas obtidas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Futebol', // Nova instância
      metas: [
        'Jogo vencido',
        'Cartões recebidos',
        'Faltas cometidas',
        'Gols de cabeça',
        'Passes certos',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Futebol', // Nova instância
      metas: [
        'Total de minutos jogados',
        'Substituições realizadas',
        'Gols de fora da área',
        'Chances criadas',
        'Lesões sofridas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Futebol', // Nova instância
      metas: [
        'Dribles bem-sucedidos',
        'Cruzamentos feitos',
        'Gols em jogos decisivos',
        'Recordes pessoais',
        'Assistências em finais',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Futebol', // Nova instância
      metas: [
        'Jogos jogados na temporada',
        'Gols contra',
        'Faltas sofridas',
        'Defesas do goleiro',
        'Gols de pênalti convertidos',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Tênis de mesa',
      metas: [
        'Pontos feitos',
        'Pontos no saque',
        'Vitórias',
        'Jogos sem levar pontos',
        'Conquistas obtidas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Vôlei',
      metas: [
        'Cortes feitos',
        'Bloqueios',
        'Saques realizados',
        'Levantamentos',
        'Conquistas obtidas',
      ],
    },
    {
      tipo: 'esportiva',
      esporte: 'Basquete',
      metas: [
        'Cestas de dois pontos',
        'Cestas de três pontos',
        'Saques realizados',
        'Levantamentos',
        'Conquistas obtidas',
      ],
    },
  ];

  novaMeta: { titulo: string; descricao: string } = {
    titulo: '',
    descricao: '',
  };

  salvarMeta() {
    // Lógica para salvar a nova meta
    console.log('Meta salva:', this.novaMeta);
    this.novaMeta = { titulo: '', descricao: '' }; // Limpar campos após salvar
  }

  toggleFilterEsportivas(event: any) {
    if (event.detail.checked) {
      this.filterEsportivas = true;
      this.filterDiarias = false;
    } else {
      this.filterEsportivas = false;
    }
  }

  toggleFilterDiarias(event: any) {
    if (event.detail.checked) {
      this.filterDiarias = true;
      this.filterEsportivas = false;
    } else {
      this.filterDiarias = false;
    }
  }

  get filteredMetas(): Meta[] {
    if (this.filterEsportivas && !this.filterDiarias) {
      return this.metasEsportivas;
    } else if (!this.filterEsportivas && this.filterDiarias) {
      return this.metasDiarias;
    } else {
      return [...this.metasDiarias, ...this.metasEsportivas];
    }
  }
}
