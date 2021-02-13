import { TestBed } from '@angular/core/testing';

import { MiaAuthGuard } from './mia-auth.guard';

describe('MiaAuthGuard', () => {
  let guard: MiaAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MiaAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
