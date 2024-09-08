import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilOutroUsuarioPage } from './perfil-outro-usuario.page';

describe('PerfilOutroUsuarioPage', () => {
  let component: PerfilOutroUsuarioPage;
  let fixture: ComponentFixture<PerfilOutroUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilOutroUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
