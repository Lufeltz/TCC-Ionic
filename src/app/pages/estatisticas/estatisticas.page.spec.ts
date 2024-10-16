import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstatisticasPage } from './estatisticas.page';

describe('EstatisticasPage', () => {
  let component: EstatisticasPage;
  let fixture: ComponentFixture<EstatisticasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
