import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiaLoginComponent, MiaLoginPageConfig } from 'projects/agencycoda/mia-auth/src/public-api';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: MiaLoginComponent,
    data: {
      titlePage: 'Login',
      logoImage: '',
      imageRight: '',
      routeHome: '/',
      routeSuccess: '/',
      routeRegister: '/auth/register',
      routeRecovery: '/auth/recovery-password'
    } as MiaLoginPageConfig
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
