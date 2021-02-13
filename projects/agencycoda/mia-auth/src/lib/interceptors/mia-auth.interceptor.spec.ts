import { TestBed } from '@angular/core/testing';

import { MiaAuthInterceptor } from './mia-auth.interceptor';

describe('MiaAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MiaAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MiaAuthInterceptor = TestBed.inject(MiaAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
