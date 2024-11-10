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
} from '@ionic/angular/standalone';
import { MenuPerfilComponent } from 'src/app/components/menu-perfil/menu-perfil.component';
import { HistoricoCampeonatosComponent } from '../../components/historico-campeonatos/historico-campeonatos.component';
import { ListagemCampeonatosComponent } from '../../components/listagem-campeonatos/listagem-campeonatos.component';
import { calendar } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LucideAngularModule, Pencil, Search } from 'lucide-angular';
import { Endereco } from 'src/app/models/endereco.model';
import { EnderecoService } from 'src/app/services/endereco.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.page.html',
  styleUrls: ['./campeonatos.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class CampeonatosPage implements OnInit {
  pageTitle: string = 'Campeonatos';
  pageMenu: string = 'campeonato-menu';
  pageContent: string = 'campeonato';
  endereco: Endereco = new Endereco();

  selectedSegment: string = 'criacao';

  campeonato = {
    titulo: '',
    aposta: '',
    limiteParticipantes: '',
    descricao: '',
    inicio: '',
    fim: '',
    logradouro: '',
    bairro: '',
    complemento: '',
    cidade: '',
    uf: '',
    numero: '',
    cep: '',
  };

  showInicioPicker: boolean = false; // Para controlar o seletor de início
  showFimPicker: boolean = false; // Para controlar o seletor de fim

  isCepValid: boolean = false; // Para controlar a validade do CEP

  readonly Pencil = Pencil;
  readonly Search = Search;

  constructor(private enderecoService: EnderecoService) {
    addIcons({ calendar });
  }

  ngOnInit() {}

  salvarDados() {
    console.log('Dados do usuário salvos:', this.campeonato);
  }

  validarCep() {
    // Valida que o CEP contém apenas números
    const cepRegex = /^[0-9]{8}$/; // Apenas 8 dígitos numéricos
    this.isCepValid = cepRegex.test(this.campeonato.cep);
  }

  pesquisarCep(cep: string) {
    this.enderecoService.getEnderecoByCep(cep).subscribe({
      next: (endereco) => {
        if (endereco) {
          this.endereco = endereco; // Armazenando o endereço retornado

          // Preenchendo os campos com os dados do endereço
          this.campeonato.logradouro = this.endereco.rua || '';
          this.campeonato.bairro = this.endereco.bairro || '';
          this.campeonato.cidade = this.endereco.cidade || '';
          this.campeonato.uf = this.endereco.uf || '';

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

  toggleInicioPicker() {
    this.showInicioPicker = !this.showInicioPicker;
  }

  toggleFimPicker() {
    this.showFimPicker = !this.showFimPicker;
  }

  onInicioChange(event: any) {
    this.campeonato.inicio = event.detail.value; // Atualiza com o valor da data e hora
    this.showInicioPicker = false; // Fecha o seletor
  }

  onFimChange(event: any) {
    this.campeonato.fim = event.detail.value; // Atualiza com o valor da data e hora
    this.showFimPicker = false; // Fecha o seletor
  }
}
