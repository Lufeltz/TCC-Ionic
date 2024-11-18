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
import { calendar } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  ALargeSmall,
  AlarmClock,
  ArrowUp10,
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
  pageTitle: string = 'Campeonatos';
  pageMenu: string = 'campeonato-menu';
  pageContent: string = 'campeonato';
  endereco: Endereco = new Endereco();
  campeonato: CampeonatoCriacao = new CampeonatoCriacao();

  dataInicio: string = '';
  horaInicio: string = '';
  dataFim: string = '';
  horaFim: string = '';

  selectedSegment: string = 'criacao';

  isPublico: boolean = true;

  isCepValid: boolean = false;

  errorMessage: string = ''; // Variável para armazenar mensagens de erro

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

  constructor(
    private enderecoService: EnderecoService,
    private campeonatoService: CampeonatoService
  ) {
    addIcons({ calendar });
  }

  ngOnInit() {
    this.campeonato.privacidadeCampeonato = 'PUBLICO';

    // Inscrever-se no observable para atualizar a lista de campeonatos
    this.campeonatoService.campeonatoCreated$.subscribe(() => {
      this.loadCampeonatos();
    });

    this.loadCampeonatos();
  }

  loadCampeonatos() {
    // Implementar a lógica para carregar a lista de campeonatos
    this.campeonatoService.getAllCampeonatos(0, 5).subscribe((campeonatos) => {
      // Atualizar a lista de campeonatos no componente
      console.log('Campeonatos carregados:', campeonatos);
    });
  }

validateLimiteTimes(event: any) {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  // Remove caracteres não numéricos
  value = value.replace(/\D/g, '');

  // Limita a entrada a 2 caracteres
  if (value.length > 2) {
    value = value.substring(0, 2);
  }

  // Verifica se o número tem 2 dígitos e é inválido
  if (value.length === 2) {
    // Verifica se o número é par
    if (parseInt(value, 10) % 2 !== 0) {
      this.errorMessage = 'O limite de times deve ser um número par!';
      input.value = ''; // Limpa o campo se não for par
    }
    // Verifica se o número é maior que 16
    else if (parseInt(value, 10) > 16) {
      this.errorMessage = 'O limite de times não pode ser maior que 16!';
      input.value = ''; // Limpa o campo se for maior que 16
    } 
    else {
      this.errorMessage = ''; // Limpa a mensagem de erro se o número for válido
      this.campeonato.limiteTimes = Number(value); // Atualiza o modelo ngModel
    }
  } else {
    this.errorMessage = ''; // Limpa a mensagem de erro enquanto o número estiver incompleto
  }

  input.value = value; // Atualiza o valor do campo
}

  

  validateNumber(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Limita a entrada a 2 caracteres
    if (value.length > 2) {
      value = value.substring(0, 2);
    }

    input.value = value;

    // Atualiza o modelo ngModel
    this.campeonato.limiteParticipantes = Number(value);
  }

  validateNumber2(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Limita a entrada a 5 caracteres
    if (cleanedValue.length > 5) {
      input.value = cleanedValue.substring(0, 5);
    } else {
      input.value = cleanedValue;
    }

    // Atualiza o modelo ngModel
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
    // this.publicacao.idModalidadeEsportiva = null; // Atualiza corretamente
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

    console.log(this.campeonato);
    this.campeonatoService.postCampeonato(this.campeonato).subscribe({
      next: (campeonatoCriado) => {
        if (campeonatoCriado) {
          console.log('Campeonato criado com sucesso:', campeonatoCriado);
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
    // Remove qualquer caractere não numérico
    cep = cep.replace(/\D/g, '');
  
    // Aplica a máscara de CEP (5 primeiros números, seguidos de um hífen e 3 números)
    if (cep.length > 5) {
      return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return cep;
  }
  

  validarCep() {
    // Remove qualquer caractere não numérico e verifica se tem exatamente 8 dígitos
    const cep = this.campeonato.endereco.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    this.isCepValid = cep.length === 8; // Valida se tem exatamente 8 dígitos
    this.campeonato.endereco.cep = cep; // Atualiza o campo com o valor limpo
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
          // console.log('Endereço não encontrado');
        }
      },
      error: (err) => {
        console.error('Erro ao consultar endereço:', err);
      },
    });
  }
}
