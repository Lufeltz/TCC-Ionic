import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CircleHelp, Lock, LucideAngularModule } from 'lucide-angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bloqueado',
  templateUrl: './bloqueado.component.html',
  styleUrls: ['./bloqueado.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, LucideAngularModule],
})
export class BloqueadoComponent implements OnInit {
  constructor() {}
  @Input() mensagemBloqueio: string = '';
  @Input() tipoErro: '403' | '404' = '404';

  readonly Lock = Lock;
  readonly CircleHelp = CircleHelp;

  ngOnInit() {}
}
