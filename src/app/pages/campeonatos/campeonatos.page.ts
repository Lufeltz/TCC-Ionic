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

    this.campeonatoService.postCampeonato(this.campeonato).subscribe({
      next: (campeonatoCriado) => {
        if (campeonatoCriado) {
          // console.log('Campeonato criado com sucesso:', campeonatoCriado);
        } else {
          // console.log('Erro ao criar campeonato');
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

  validarCep() {
    const cepRegex = /^[0-9]{8}$/;
    this.isCepValid = cepRegex.test(this.campeonato.endereco.cep);
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
