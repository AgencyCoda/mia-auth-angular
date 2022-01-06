import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiaForgotPassComponent, MiaLoginComponent, MiaLoginPageConfig } from 'projects/agencycoda/mia-auth/src/public-api';

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
      routeRecovery: '/auth/recovery-password',
      hasLoginWithGoogle: false,
      roles: [1]
    } as MiaLoginPageConfig
  },
  { 
    path: 'recovery-password', 
    component: MiaForgotPassComponent,
    data: {
      titlePage: '',
      logoImage: '',
      imageRight: '',
      routeHome: '/',
      routeLogin: '/auth/login'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
