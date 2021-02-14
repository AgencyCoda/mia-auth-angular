import { TestBed } from '@angular/core/testing';

import { MiaRoleService } from './mia-role.service';

describe('MiaRoleService', () => {
  let service: MiaRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiaRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
