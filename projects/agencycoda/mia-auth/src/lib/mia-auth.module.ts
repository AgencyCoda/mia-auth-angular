import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { MiaAuthComponent } from './mia-auth.component';

export const MIA_AUTH_PROVIDER = new InjectionToken<MiaAuthConfig>('agencycoda.auth');

@Injectable()
export class MiaAuthConfig {
  baseUrl: string = '';
}

@NgModule({
  declarations: [MiaAuthComponent],
  imports: [],
  exports: [MiaAuthComponent],
  providers: [
    {
      provide: MIA_AUTH_PROVIDER,
      useClass: MiaAuthConfig
    }
  ]
})
export class MiaAuthModule { }
