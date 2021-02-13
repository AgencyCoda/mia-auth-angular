import { Injectable, InjectionToken, NgModule } from '@angular/core';

export const MIA_AUTH_PROVIDER = new InjectionToken<MiaAuthConfig>('agencycoda.auth');

@Injectable()
export class MiaAuthConfig {
  baseUrl: string = '';
}

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: MIA_AUTH_PROVIDER,
      useClass: MiaAuthConfig
    }
  ]
})
export class MiaAuthModule { }
