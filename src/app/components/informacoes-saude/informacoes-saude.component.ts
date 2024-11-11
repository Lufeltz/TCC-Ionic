import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Clock,
  LucideAngularModule,
  MapPinPlusInside,
  Phone,
  Stethoscope,
  User,
} from 'lucide-angular';
import { Saude } from 'src/app/models/saude.model';
import { SaudeService } from 'src/app/services/saude.service';

@Component({
  selector: 'app-informacoes-saude',
  templateUrl: './informacoes-saude.component.html',
  styleUrls: ['./informacoes-saude.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class InformacoesSaudeComponent implements OnInit {
  constructor(private saudeService: SaudeService) {}

  readonly Stethoscope = Stethoscope;
  readonly Phone = Phone;
  readonly Clock = Clock;
  readonly MapPinPlusInside = MapPinPlusInside;

  contatosSaude: Saude[] = [];

  canaisDeSaude = [
    {
      nome: 'Clínica da Família',
      responsavel: 'Dr. João Silva',
      telefone: '(11) 98765-4321',
      endereco: 'Rua das Flores, 123 - Centro, São Paulo',
      horarioFuncionamento: 'Segunda a Sexta, 8h às 17h',
    },
    {
      nome: 'Hospital Municipal',
      responsavel: 'Dra. Maria Oliveira',
      telefone: '(11) 99876-5432',
      endereco: 'Avenida Brasil, 456 - Bairro Novo, São Paulo',
      horarioFuncionamento: '24 horas',
    },
    {
      nome: 'UBS Jardim das Oliveiras',
      responsavel: 'Dr. Carlos Pereira',
      telefone: '(11) 91234-5678',
      endereco: 'Praça das Oliveiras, 789 - Jardim das Oliveiras, São Paulo',
      horarioFuncionamento: 'Segunda a Sexta, 7h às 19h',
    },
  ];

  ngOnInit() {
    // Chama a função que realiza a requisição e salva os dados
    this.loadContatosSaude();
  }

  // Função para realizar a requisição e salvar os dados
  loadContatosSaude() {
    this.saudeService.getContatosSaude().subscribe({
      next: (data: Saude[] | null) => {
        this.contatosSaude = data || [];
        console.log('Dados de saúde recebidos:', this.contatosSaude);
      },
      error: (err) => {
        console.error('Erro ao buscar dados de saúde:', err);
      },
    });
  }
}
