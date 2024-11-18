import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from '../../components/menu-perfil/menu-perfil.component';
import { star, starOutline, starHalfOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  ChartColumn,
  LucideAngularModule,
  MousePointerClick,
  Save,
  Star,
  StarHalf,
  User,
  Volleyball,
} from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';
import { Academico } from 'src/app/models/academico.model';
import { AuthService } from 'src/app/services/auth.service';
import { AcademicoService } from 'src/app/services/academico.service';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';

@Component({
  selector: 'app-avaliar-jogador',
  templateUrl: './avaliar-jogador.page.html',
  styleUrls: ['./avaliar-jogador.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    LucideAngularModule,
  ],
})
export class AvaliarJogadorPage implements OnInit {
  pageTitle: string = 'Avaliar Jogador';
  pageMenu: string = 'avaliar-jogador';
  pageContent: string = 'avaliar-jogador';

  username: string = '';

  readonly Star = Star;
  readonly StarHalf = StarHalf;
  readonly User = User;
  readonly Volleyball = Volleyball;
  readonly ChartColumn = ChartColumn;
  readonly MousePointerClick = MousePointerClick;
  readonly Save = Save;

  avaliacoes: number[] = [
    5, 4, 5, 3, 4, 4, 5, 3, 5, 5, 5, 4, 5, 4, 3, 2, 4, 5, 4, 3, 2, 3, 4,
  ];
  mediaAtual: number = 0;
  quantidadeEstrelas: number = 0;
  temEstrelaMeia: boolean = false;

  selectedRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  academico: Academico | null = null;
  meuAcademico: Academico | null = null;
  modalidadesString: string = '';

  mediaAvaliacao: Avaliacao | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private academicoService: AcademicoService,
    private campeonatoService: CampeonatoService
  ) {}

  ngOnInit() {
    const usernameFinal =
      this.username || this.authService.getUser()?.username || '';

    this.meuAcademico = this.authService.getUser();
    console.log(this.meuAcademico);

    this.route.paramMap.subscribe((params) => {
      const usernameRota = params.get('username') || '';
      if (usernameRota) {
        this.username = usernameRota;
      }

      if (this.username) {
        this.buscarAcademicoPorUsername(this.username);
      } else {
        console.error('Username não fornecido');
      }
    });

    // Não é necessário chamar 'formatarModalidades' aqui, pois ela já é chamada
    // dentro de 'buscarAcademicoPorUsername' quando o acadêmico for carregado
    console.log('Username do jogador na avaliação', this.username);
  }

  obterMediaAvaliacao(): void {
    if (this.academico && this.academico.idAcademico) {
      // Verifica se 'academico' não é null
      this.campeonatoService
        .getMediaAvaliacao(this.academico.idAcademico)
        .subscribe(
          (data: Avaliacao | null) => {
            this.mediaAvaliacao = data;
            console.log('Média de avaliação:', this.mediaAvaliacao);

            // Após obter a nova média, calcule novamente as estrelas
            this.calcularMedia();
          },
          (error) => {
            console.error('Erro ao obter avaliação:', error);
          }
        );
    } else {
      console.error('Academico não carregado ou idAcademico não disponível');
    }
  }

  buscarAcademicoPorUsername(username: string) {
    this.academicoService.getAcademicoByUsername(username).subscribe({
      next: (academico: Academico | null) => {
        this.academico = academico; // Atribui o acadêmico à variável

        // Após o acadêmico ser carregado, formate as modalidades
        this.formatarModalidades();

        // Agora que o acadêmico foi carregado, podemos buscar a média de avaliação
        if (this.academico) {
          this.obterMediaAvaliacao();
        }

        // Verifique o acadêmico carregado
        console.log('Acadêmico carregado', this.academico);
      },
      error: (err) => {
        console.error('Erro ao buscar acadêmico:', err);
      },
    });
  }

  formatarModalidades() {
    if (this.academico?.modalidades && this.academico.modalidades.length > 0) {
      this.modalidadesString = this.academico.modalidades
        .map((modalidade) => modalidade.nomeModalidade)
        .join(', ');
    } else {
      this.modalidadesString = 'Sem modalidades'; // Exibe a mensagem "Sem modalidades" caso não haja modalidades
    }
  }
  

  calcularMedia() {
    if (this.mediaAvaliacao) {
      this.mediaAtual = this.mediaAvaliacao.mediaGeral; // Média geral da avaliação
      this.quantidadeEstrelas = Math.floor(this.mediaAtual);
      this.temEstrelaMeia =
        this.mediaAtual % 1 >= 0.5 && this.mediaAtual % 1 < 1;

      // Aqui você pode chamar uma função para atualizar a exibição das estrelas
      this.atualizarEstrelas();
    }
  }

  atualizarEstrelas() {
    // Atualize a quantidade de estrelas preenchidas
    this.stars = Array.from({ length: 5 }, (_, index) => index + 1);
  }

  rate(stars: number) {
    this.selectedRating = stars;

    // Chama a função para salvar a avaliação ao clicar na estrela
    // this.saveRating();
  }

  saveRating() {
    if (this.selectedRating && this.academico && this.meuAcademico) {
      const idAvaliador = this.meuAcademico.idAcademico; // id do acadêmico logado
      const idAcademico = this.academico.idAcademico; // id do acadêmico sendo avaliado
      const nota = this.selectedRating; // nota em estrelas
      const idModalidade = this.academico.modalidades[0].idModalidade; // Assumindo que a modalidade é a primeira

      // Enviar a avaliação para o servidor
      this.campeonatoService
        .avaliarJogador(idAvaliador, idAcademico, nota, idModalidade)
        .subscribe(
          (response) => {
            console.log('Avaliação salva com sucesso!', response);

            // Após salvar, recalcular a média e atualizar as estrelas
            this.obterMediaAvaliacao(); // Recalcular a média após salvar
          },
          (error) => {
            console.error('Erro ao salvar avaliação:', error);
          }
        );
    } else {
      console.error(
        'Selecione uma avaliação válida e verifique os dados do acadêmico.'
      );
    }
  }
}
