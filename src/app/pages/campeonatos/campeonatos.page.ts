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
  IonRadioGroup
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { HistoricoCampeonatosComponent } from '../../components/historico-campeonatos/historico-campeonatos.component';
import { ListagemCampeonatosComponent } from '../../components/listagem-campeonatos/listagem-campeonatos.component';
import { calendar } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LucideAngularModule, Pencil, Search } from 'lucide-angular';
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

  isPublico: boolean = true; // Variável para controlar o toggle

  isCepValid: boolean = false; // Para controlar a validade do CEP

  readonly Pencil = Pencil;
  readonly Search = Search;

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
    this.campeonato.privacidadeCampeonato = this.isPublico ? 'PUBLICO' : 'PRIVADO';
  }

  salvarDados() {
    // Combine as datas e horas
    this.campeonato.dataInicio = this.combineDateAndTime(
      this.dataInicio,
      this.horaInicio
    );
    this.campeonato.dataFim = this.combineDateAndTime(
      this.dataFim,
      this.horaFim
    );

    console.log('Dados do campeonato:', this.campeonato);

    // Chama o serviço para enviar os dados
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

  validarCep() {
    // Valida que o CEP contém apenas números
    const cepRegex = /^[0-9]{8}$/; // Apenas 8 dígitos numéricos
    this.isCepValid = cepRegex.test(this.campeonato.endereco.cep);
  }

  pesquisarCep(cep: string) {
    this.enderecoService.getEnderecoByCep(cep).subscribe({
      next: (endereco) => {
        if (endereco) {
          this.endereco = endereco; // Armazenando o endereço retornado

          // Preenchendo os campos com os dados do endereço
          this.campeonato.endereco.rua = this.endereco.rua || '';
          this.campeonato.endereco.bairro = this.endereco.bairro || '';
          this.campeonato.endereco.cidade = this.endereco.cidade || '';
          this.campeonato.endereco.uf = this.endereco.uf || '';

          console.log('Endereço encontrado:', this.endereco);
        } else {
          console.log('Endereço não encontrado');
        }
      },
      error: (err) => {
        console.error('Erro ao consultar endereço:', err);
      },
    });
  }
}
