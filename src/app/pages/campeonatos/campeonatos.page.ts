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
  IonButton,
  IonToast,
  IonInput,
  IonDatetime,
  IonIcon,
  IonItem,
  IonRadio,
  IonRadioGroup,
  IonTextarea,
  IonText,
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { HistoricoCampeonatosComponent } from '../../components/historico-campeonatos/historico-campeonatos.component';
import { ListagemCampeonatosComponent } from '../../components/listagem-campeonatos/listagem-campeonatos.component';
import {
  ALargeSmall,
  AlarmClock,
  CalendarArrowUp,
  CalendarCheck,
  CircleDollarSign,
  EyeOff,
  Key,
  LucideAngularModule,
  MapPinHouse,
  MapPinned,
  NotebookText,
  Pencil,
  Search,
  User,
  Users,
  Volleyball,
} from 'lucide-angular';
import { Endereco } from 'src/app/models/endereco.model';
import { EnderecoService } from 'src/app/services/endereco.service';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { CampeonatoCriacao } from 'src/app/models/campeonato-criacao.model';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.page.html',
  styleUrls: ['./campeonatos.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonTextarea,
    IonRadio,
    IonItem,
    IonIcon,
    IonDatetime,
    IonInput,
    IonToast,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuPerfilComponent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    HistoricoCampeonatosComponent,
    ListagemCampeonatosComponent,
    LucideAngularModule,
    IonRadioGroup,
  ],
})
export class CampeonatosPage implements OnInit {
  constructor(
    private enderecoService: EnderecoService,
    private campeonatoService: CampeonatoService,
    private authService: AuthService,
    private stateService: StateService
  ) {}
  
  pageTitle: string = 'Campeonatos';
  pageMenu: string = 'campeonato-menu';
  pageContent: string = 'campeonato';
  endereco: Endereco = new Endereco();
  campeonato: CampeonatoCriacao = new CampeonatoCriacao();

  dataInicio: string = '';
  horaInicio: string = '';
  dataFim: string = '';
  horaFim: string = '';

  selectedSegment: string = 'listagem-campeonatos';

  isPublico: boolean = true;

  isCepValid: boolean = false;

  errorMessage: string = '';
  usuarioLogado: Academico | null = null;

  readonly Pencil = Pencil;
  readonly Search = Search;
  readonly ALargeSmall = ALargeSmall;
  readonly EyeOff = EyeOff;
  readonly CircleDollarSign = CircleDollarSign;
  readonly Key = Key;
  readonly Users = Users;
  readonly User = User;
  readonly NotebookText = NotebookText;
  readonly CalendarArrowUp = CalendarArrowUp;
  readonly CalendarCheck = CalendarCheck;
  readonly AlarmClock = AlarmClock;
  readonly MapPinHouse = MapPinHouse;
  readonly MapPinned = MapPinned;
  readonly Volleyball = Volleyball;

  ngOnInit() {
    this.usuarioLogado = this.authService.getUser();

    if (this.usuarioLogado) {
      this.campeonato.idAcademico = this.usuarioLogado.idAcademico;
    }

    this.campeonatoService.campeonatoCreated$.subscribe(() => {
      this.loadCampeonatos();
    });

    this.loadCampeonatos();
  }

  loadCampeonatos() {
    this.campeonatoService
      .getAllCampeonatos(0, 5)
      .subscribe((campeonatos) => {});
  }

  validateLimiteTimes(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    if (value.length === 2) {
      if (parseInt(value, 10) % 2 !== 0) {
        this.errorMessage = 'O limite de times deve ser um número par!';
        input.value = '';
      } else if (parseInt(value, 10) > 16) {
        this.errorMessage = 'O limite de times não pode ser maior que 16!';
        input.value = '';
      } else {
        this.errorMessage = '';
        this.campeonato.limiteTimes = Number(value);
      }
    } else {
      this.errorMessage = '';
    }

    input.value = value;
  }

  validateNumber(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    input.value = value;

    this.campeonato.limiteParticipantes = Number(value);
  }

  validateNumber2(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length > 5) {
      input.value = cleanedValue.substring(0, 5);
    } else {
      input.value = cleanedValue;
    }

    this.campeonato.endereco.numero = Number(input.value);
  }

  onToggleChange(event: any) {
    this.isPublico = event.detail.checked;
    this.campeonato.privacidadeCampeonato = this.isPublico
      ? 'PUBLICO'
      : 'PRIVADO';
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  }

  salvarDados() {
    this.campeonato.dataInicio = this.combineDateAndTime(
      this.dataInicio,
      this.horaInicio
    );
    this.campeonato.dataFim = this.combineDateAndTime(
      this.dataFim,
      this.horaFim
    );

    this.campeonatoService.postCampeonato(this.campeonato).subscribe({
      next: (campeonatoCriado) => {
        if (campeonatoCriado) {
          this.stateService.triggerUpdateListagemCampeonatos();
        } else {
          console.log('Erro ao criar campeonato');
        }
      },
      error: (err) => {
        console.error('Erro ao enviar os dados:', err);
      },
    });
  }

  onCheckboxChange(value: string) {
    if (value === 'PUBLICO') {
      this.campeonato.privacidadeCampeonato = 'PUBLICO';
    } else {
      this.campeonato.privacidadeCampeonato = 'PRIVADO';
    }
  }

  combineDateAndTime(date: string, time: string): string {
    return `${date}T${time}:00Z`;
  }

  formatarCep(cep: string): string {
    cep = cep.replace(/\D/g, '');

    if (cep.length > 5) {
      return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return cep;
  }

  validarCep() {
    const cep = this.campeonato.endereco.cep.replace(/\D/g, '');
    this.isCepValid = cep.length === 8;
    this.campeonato.endereco.cep = cep;
  }

  pesquisarCep(cep: string) {
    this.enderecoService.getEnderecoByCep(cep).subscribe({
      next: (endereco) => {
        if (endereco) {
          this.endereco = endereco;

          this.campeonato.endereco.rua = this.endereco.rua || '';
          this.campeonato.endereco.bairro = this.endereco.bairro || '';
          this.campeonato.endereco.cidade = this.endereco.cidade || '';
          this.campeonato.endereco.uf = this.endereco.uf || '';
        } else {
        }
      },
      error: (err) => {
        console.error('Erro ao consultar endereço:', err);
      },
    });
  }
}
