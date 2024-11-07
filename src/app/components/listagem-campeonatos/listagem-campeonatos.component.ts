import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonButton,
  IonIcon,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, lockOpen } from 'ionicons/icons';
import { NgxMaskPipe } from 'ngx-mask';
import { AlertController } from '@ionic/angular';
import {
  LockOpen,
  LucideAngularModule,
  Lock,
  SquareArrowUpRight,
  ExternalLink,
  RotateCw,
  Users,
  PersonStanding,
  User,
  Volleyball,
  MessageSquareCode,
  Flag,
  MapPin,
  CalendarCheck,
  CalendarArrowUp,
  Calendar,
  CircleDollarSign,
  NotebookText,
  NotebookPen,
  UsersRound,
} from 'lucide-angular';
import { Campeonato } from 'src/app/models/campeonato.model';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem-campeonatos',
  templateUrl: './listagem-campeonatos.component.html',
  styleUrls: ['./listagem-campeonatos.component.scss'],
  imports: [
    IonToggle,
    IonIcon,
    IonButton,
    IonItem,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    CommonModule,
    NgxMaskPipe,
    LucideAngularModule,
    FormsModule
  ],
  standalone: true,
})
export class ListagemCampeonatosComponent implements OnInit, OnChanges {
  readonly SquareArrowUpRight = SquareArrowUpRight;
  readonly Lock = Lock;
  readonly LockOpen = LockOpen;
  readonly ExternalLink = ExternalLink;
  readonly RotateCw = RotateCw;
  readonly UsersRound = UsersRound;
  readonly Users = Users;
  readonly User = User;
  readonly Volleyball = Volleyball;
  readonly MessageSquareCode = MessageSquareCode;
  readonly Flag = Flag;
  readonly MapPin = MapPin;
  readonly CalendarCheck = CalendarCheck;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly Calendar = Calendar;
  readonly CircleDollarSign = CircleDollarSign;
  readonly NotebookText = NotebookText;
  readonly NotebookPen = NotebookPen;

  campeonatos: Campeonato[] = [];
  mensagem!: string;
  mensagem_detalhes!: string;
  loading: boolean = true;

  getIconColor(privacidade: string): string {
    return privacidade === 'privado' ? 'red' : 'green';
  }
  filteredCampeonatos: Campeonato[] = [];

  @Input() statusToggles: {
    aberto?: boolean;
    finalizado?: boolean;
    iniciado?: boolean;
    participando?: boolean;  // Ensure this is a boolean value
  } = { participando: true };

  @Input() searchedCampeonatos: string = '';

  constructor(
    private alertController: AlertController,
    private campeonatoService: CampeonatoService
  ) {
    addIcons({ lockClosed, lockOpen });
  }

  ngOnInit() {
    this.listarCampeonatos();
  }

  listarCampeonatos(): Campeonato[] {
    this.campeonatoService.getAllCampeonatos().subscribe({
      next: (data: Campeonato[] | null) => {
        this.loading = false; // Define loading como falso quando os dados são recebidos
        if (data == null) {
          this.campeonatos = [];
        } else {
          this.campeonatos = data;
          console.log(this.campeonatos);
        }
      },
      error: (err) => {
        this.loading = false; // Define loading como falso em caso de erro
        this.mensagem = 'Erro buscando lista de funcionários';
        this.mensagem_detalhes = `[${err.status} ${err.message}]`;
      },
    });
    return this.campeonatos;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Implementar se necessário
  }

  async presentAlertPrompt(campeonato: Campeonato, errorMessage: string = '') {
    const alert = await this.alertController.create({
      header: 'Insira a senha',
      message: errorMessage,
      inputs: [
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Senha',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operação cancelada');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            this.verificarSenha(campeonato, data.senha);
          },
        },
      ],
    });

    await alert.present();
  }

  verificarSenha(campeonato: Campeonato, senha: string) {
    const senhaCorreta = 'senha123'; // Defina a senha correta aqui

    if (senha === senhaCorreta) {
      console.log('Você entrou no campeonato:', campeonato.titulo);
    } else {
      this.presentAlertPrompt(campeonato, 'Senha errada. Tente novamente.');
    }
  }
}
