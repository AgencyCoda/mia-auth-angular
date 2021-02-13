import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaAuthService } from '../mia-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MiaAuthGuard implements CanActivate {

  constructor(
    protected authService: MiaAuthService,
    protected navigator: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLoggedIn.pipe(map(isLogged => {

        if(!isLogged){
          let paramRedirect = window.location.pathname;
          if (paramRedirect.includes('auth/login')) {
            paramRedirect = '';
          }
          // Navigate to the login page with extras
          this.navigator.navigate(['/auth/login'], { queryParams: { redirect: paramRedirect } });
        }
        
        return isLogged;
      }));

  }
  
}
