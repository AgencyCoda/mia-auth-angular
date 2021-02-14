import { HttpClientModule } from '@angular/common/http';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { StorageModule } from '@ngx-pwa/local-storage';
import { CurrentUserPipe } from './pipes/current-user.pipe';
import { RoleTitlePipe } from './pipes/role-title.pipe';

export const MIA_AUTH_PROVIDER = new InjectionToken<MiaAuthConfig>('agencycoda.auth');

@Injectable()
export class MiaAuthConfig {
  baseUrl: string = '';
}

@NgModule({
  declarations: [CurrentUserPipe, RoleTitlePipe],
  imports: [
    HttpClientModule,
    StorageModule
  ],
  exports: [
    CurrentUserPipe,
    RoleTitlePipe
  ],
  providers: [
    {
      provide: MIA_AUTH_PROVIDER,
      useClass: MiaAuthConfig
    }
  ]
})
export class MiaAuthModule { }
