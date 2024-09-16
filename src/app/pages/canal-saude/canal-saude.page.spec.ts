import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanalSaudePage } from './canal-saude.page';

describe('CanalSaudePage', () => {
  let component: CanalSaudePage;
  let fixture: ComponentFixture<CanalSaudePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalSaudePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
