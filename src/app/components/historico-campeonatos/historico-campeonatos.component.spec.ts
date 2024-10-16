import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoricoCampeonatosComponent } from './historico-campeonatos.component';

describe('HistoricoCampeonatosComponent', () => {
  let component: HistoricoCampeonatosComponent;
  let fixture: ComponentFixture<HistoricoCampeonatosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoCampeonatosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoCampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
