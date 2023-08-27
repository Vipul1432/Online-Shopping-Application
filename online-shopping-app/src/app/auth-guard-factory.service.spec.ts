import { TestBed } from '@angular/core/testing';

import { AuthGuardFactoryService } from './auth-guard-factory.service';

describe('AuthGuardFactoryService', () => {
  let service: AuthGuardFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
