import { Inject, Injectable } from '@angular/core';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from './mia-auth.module';

@Injectable({
  providedIn: 'root'
})
export class MiaAuthService {

  constructor(
    @Inject(MIA_AUTH_PROVIDER) protected config: MiaAuthConfig
  ) { }

  getConfig() {
    return this.config;
  }
}
