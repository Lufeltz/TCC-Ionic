import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaveamentoPage } from './chaveamento.page';

describe('ChaveamentoPage', () => {
  let component: ChaveamentoPage;
  let fixture: ComponentFixture<ChaveamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaveamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
