import { TestBed } from '@angular/core/testing';

import { MiaAuthService } from './mia-auth.service';

describe('MiaAuthService', () => {
  let service: MiaAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
