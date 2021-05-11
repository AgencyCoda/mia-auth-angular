import { HttpClientModule } from '@angular/common/http';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageModule } from '@ngx-pwa/local-storage';
import { MiaPermissionStatic, MiaRoleStatic } from './entities/mia-role';
import { CurrentUserPipe } from './pipes/current-user.pipe';
import { RoleTitlePipe } from './pipes/role-title.pipe';
import { MiaRolesOnlyDirective } from './directives/mia-roles-only.directive';
import { MiaPermissionOnlyDirective } from './directives/mia-permission-only.directive';
import { RoleIdPipe } from './pipes/role-id.pipe';
import { MiaLoginComponent } from './pages/mia-login/mia-login.component';

/** Angular Material */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  declarations: [
    CurrentUserPipe, 
    RoleTitlePipe, 
    RoleIdPipe,
    
    MiaRolesOnlyDirective, 
    MiaPermissionOnlyDirective,
    MiaLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    StorageModule,

    /** Angular Material */
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CurrentUserPipe,
    RoleTitlePipe,
    RoleIdPipe,

    MiaRolesOnlyDirective,
    MiaPermissionOnlyDirective,

    MiaLoginComponent
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
