import { MiaRole } from '@agencycoda/mia-auth';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { StorageModule } from '@ngx-pwa/local-storage';
import { MiaPermissionStatic, MiaRoleStatic } from './entities/mia-role';
import { CurrentUserPipe } from './pipes/current-user.pipe';
import { RoleTitlePipe } from './pipes/role-title.pipe';

export const MIA_AUTH_PROVIDER = new InjectionToken<MiaAuthConfig>('agencycoda.auth');
export const MIA_PERMISSION_PROVIDER = new InjectionToken<MiaPermissionConfig>('agencycoda.permission');

@Injectable()
export class MiaAuthConfig {
  baseUrl: string = '';
}

@Injectable()
export class MiaPermissionConfig {
  roles: Array<MiaRoleStatic> = [];
  permissions: Array<MiaPermissionStatic> = [];
  allow: Array<{ role: string, permissions: [string]}> = [];
  deny: Array<{ role: string, permissions: [string]}> = [];
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
    },
    {
      provide: MIA_PERMISSION_PROVIDER,
      useClass: MiaPermissionConfig
    }
  ]
})
export class MiaAuthModule { }
