import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AtSign,
  Clock,
  LucideAngularModule,
  MapPinPlusInside,
  Phone,
  Stethoscope,
} from 'lucide-angular';
import { Academico } from 'src/app/models/academico.model';
import { Saude } from 'src/app/models/saude.model';
import { TelefoneMaskPipe } from 'src/app/pipes/telefone-mask.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { SaudeService } from 'src/app/services/saude.service';

@Component({
  selector: 'app-informacoes-saude',
  templateUrl: './informacoes-saude.component.html',
  styleUrls: ['./informacoes-saude.component.scss'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TelefoneMaskPipe],
})
export class InformacoesSaudeComponent implements OnInit {
  constructor(
    private saudeService: SaudeService,
    private authService: AuthService
  ) {}

  contatosSaude: Saude[] = [];
  user: Academico | null = null;

  readonly Stethoscope = Stethoscope;
  readonly Phone = Phone;
  readonly Clock = Clock;
  readonly AtSign = AtSign;
  readonly MapPinPlusInside = MapPinPlusInside;

  ngOnInit() {
    this.loadContatosSaude();
    this.getUsuarioLogado();
  }

  loadContatosSaude() {
    this.saudeService.getContatosSaude().subscribe({
      next: (data: Saude[] | null) => {
        this.contatosSaude = data || [];
      },
      error: (err) => {
        console.error('Erro ao buscar dados de saúde:', err);
      },
    });
  }

  getUsuarioLogado() {
    this.user = this.authService.getUser();
  }
}
