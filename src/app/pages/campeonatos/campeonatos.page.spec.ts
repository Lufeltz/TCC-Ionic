import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampeonatosPage } from './campeonatos.page';

describe('CampeonatosPage', () => {
  let component: CampeonatosPage;
  let fixture: ComponentFixture<CampeonatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CampeonatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
