import { TestBed } from '@angular/core/testing';

import { CheckRegistrationService } from './check-registration.service';

describe('CheckRegistrationService', () => {
  let service: CheckRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
