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
  @Input() mensagemBloqueio: string = ''; // Mensagem para exibir
  @Input() tipoErro: '403' | '404' = '404'; // Tipo de erro, pode ser 403 ou 404

  readonly Lock = Lock; // Icone para 403
  readonly CircleHelp = CircleHelp; // Icone para 404

  constructor() {}

  ngOnInit() {}
}
