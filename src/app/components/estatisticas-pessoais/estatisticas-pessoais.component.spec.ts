import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstatisticasPessoaisComponent } from './estatisticas-pessoais.component';

describe('EstatisticasPessoaisComponent', () => {
  let component: EstatisticasPessoaisComponent;
  let fixture: ComponentFixture<EstatisticasPessoaisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticasPessoaisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstatisticasPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
