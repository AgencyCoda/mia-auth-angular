import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MiaPermissionConfig, MIA_PERMISSION_PROVIDER } from '../mia-auth.module';

@Injectable({
  providedIn: 'root'
})
export class MiaPermissionGuard implements CanActivate {

  constructor(
    @Inject(MIA_PERMISSION_PROVIDER) protected config: MiaPermissionConfig,
    protected navigator: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
