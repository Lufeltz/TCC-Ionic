import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrefNotifPage } from './pref-notif.page';

describe('PrefNotifPage', () => {
  let component: PrefNotifPage;
  let fixture: ComponentFixture<PrefNotifPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefNotifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
