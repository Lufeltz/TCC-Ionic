import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListagemCampeonatosComponent } from './listagem-campeonatos.component';

describe('ListagemCampeonatosComponent', () => {
  let component: ListagemCampeonatosComponent;
  let fixture: ComponentFixture<ListagemCampeonatosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemCampeonatosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemCampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
