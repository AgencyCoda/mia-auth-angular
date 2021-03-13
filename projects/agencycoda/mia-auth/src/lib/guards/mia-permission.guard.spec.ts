import { TestBed } from '@angular/core/testing';

import { MiaPermissionGuard } from './mia-permission.guard';

describe('MiaPermissionGuard', () => {
  let guard: MiaPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MiaPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
