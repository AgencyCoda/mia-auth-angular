import { HttpClientModule } from '@angular/common/http';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { StorageModule } from '@ngx-pwa/local-storage';

export const MIA_AUTH_PROVIDER = new InjectionToken<MiaAuthConfig>('agencycoda.auth');

@Injectable()
export class MiaAuthConfig {
  baseUrl: string = '';
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StorageModule
  ],
  exports: [],
  providers: [
    {
      provide: MIA_AUTH_PROVIDER,
      useClass: MiaAuthConfig
    }
  ]
})
export class MiaAuthModule { }
