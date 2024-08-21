import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalidadesPage } from './modalidades.page';

describe('ModalidadesPage', () => {
  let component: ModalidadesPage;
  let fixture: ComponentFixture<ModalidadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
