import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRPortalComponent } from './hr-portal.component';

describe('HRPortalComponent', () => {
  let component: HRPortalComponent;
  let fixture: ComponentFixture<HRPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRPortalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
