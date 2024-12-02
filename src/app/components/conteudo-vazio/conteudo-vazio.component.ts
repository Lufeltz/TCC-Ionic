import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CircleHelp, Lock, LucideAngularModule } from 'lucide-angular';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-conteudo-vazio',
  templateUrl: './conteudo-vazio.component.html',
  styleUrls: ['./conteudo-vazio.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, LucideAngularModule, RouterModule],
})
export class ConteudoVazioComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() mensagemAusencia: string = '';
  @Input() tipoErro: '404' | '204' = '404';

  readonly CircleHelp = CircleHelp;

  ngOnInit() {}

  navigateToModalidades() {
    this.router.navigate(['/homepage/modalidades']);
  }
}
