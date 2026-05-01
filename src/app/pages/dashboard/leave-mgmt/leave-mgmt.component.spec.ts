import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMgmtComponent } from './leave-mgmt.component';

describe('LeaveMgmtComponent', () => {
  let component: LeaveMgmtComponent;
  let fixture: ComponentFixture<LeaveMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
