import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliarJogadorPage } from './avaliar-jogador.page';

describe('AvaliarJogadorPage', () => {
  let component: AvaliarJogadorPage;
  let fixture: ComponentFixture<AvaliarJogadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliarJogadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
