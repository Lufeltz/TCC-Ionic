import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstatisticasEsportivasComponent } from './estatisticas-esportivas.component';

describe('EstatisticasEsportivasComponent', () => {
  let component: EstatisticasEsportivasComponent;
  let fixture: ComponentFixture<EstatisticasEsportivasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticasEsportivasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstatisticasEsportivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
