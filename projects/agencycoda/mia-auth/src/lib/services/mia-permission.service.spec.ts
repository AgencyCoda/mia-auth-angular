import { TestBed } from '@angular/core/testing';

import { MiaPermissionService } from './mia-permission.service';

describe('MiaPermissionService', () => {
  let service: MiaPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
