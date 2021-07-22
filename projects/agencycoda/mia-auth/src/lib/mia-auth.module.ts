import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageModule } from '@ngx-pwa/local-storage';
import { CurrentUserPipe } from './pipes/current-user.pipe';
import { RoleTitlePipe } from './pipes/role-title.pipe';
import { MiaRolesOnlyDirective } from './directives/mia-roles-only.directive';
import { MiaPermissionOnlyDirective } from './directives/mia-permission-only.directive';
import { RoleIdPipe } from './pipes/role-id.pipe';


/** Angular Material */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MiaAuthConfig, MiaPermissionConfig, MIA_AUTH_PROVIDER, MIA_PERMISSION_PROVIDER } from './entities/mia-auth-config';

/** Directives */
import { MiaCurrentUserDirective } from './directives/mia-current-user.directive';

/** Pages */
import { MiaLoginComponent } from './pages/mia-login/mia-login.component';
import { MiaForgotPassComponent } from './pages/mia-forgot-pass/mia-forgot-pass.component';

@NgModule({
  declarations: [
    CurrentUserPipe, 
    RoleTitlePipe, 
    RoleIdPipe,
    
    MiaRolesOnlyDirective, 
    MiaPermissionOnlyDirective,
    MiaCurrentUserDirective,
    /** Pages  */
    MiaLoginComponent,
    MiaForgotPassComponent,
  ],
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
    MiaCurrentUserDirective
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
