import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaPermissionConfig, MIA_PERMISSION_PROVIDER } from '../entities/mia-auth-config';
import { MiaPermissionStatic, MiaRoleStatic } from '../entities/mia-role';
import { MiaAuthService } from '../mia-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MiaPermissionService {

  constructor(
    protected authService: MiaAuthService,
    @Inject(MIA_PERMISSION_PROVIDER) protected config: MiaPermissionConfig,
  ) { }

  validPermission(permissionString: string): Observable<boolean> {
    return this.authService.getUser().pipe(map(user => {
      if(user.id == 0){
        return false;
      }
      return this.hasPermission(user.role, permissionString);
    }));
  }

  validRoles(rolesString: Array<string>): Observable<boolean> {
    let roles = this.getToRolesString(rolesString);
    return this.authService.getUser().pipe(map(user => {
      if(user.id == 0){
        return false;
      }
      return this.hasRole(user.role, roles);
    }));
  }

  hasPermission(userRoleId: number, permissionString: string): boolean {
    // Verify if existe permission
    if(!this.isExistPermission(permissionString)){
      return false;
    }
    let userRoleString = this.getRoleStringToRoleNumber(userRoleId);
    // verify if deny
    if(this.isDenyPermissionByRole(userRoleString, permissionString)){
      return false;
    }
    // Verify if allow
    if(this.isAllowPermissionByRole(userRoleString, permissionString)){
      return true;
    }

    return false;
  }

  isAllowPermissionByRole(roleString: string, permissionString: string): boolean {
    let item = this.getConfigAllow(roleString);

    if(item == undefined){
      return false;
    }

    for (const permission of item.permissions) {
      if(permission == permissionString){
        return true;
      }
    }

    return false;
  }

  isDenyPermissionByRole(roleString: string, permissionString: string): boolean {
    let item: { role: string, permissions: [string]} | undefined;
    for (const deny of this.config.deny) {
      if(deny.role == roleString){
        item = deny;
      }
    }

    if(item == undefined){
      return false;
    }

    for (const permission of item.permissions) {
      if(permission == permissionString){
        return true;
      }
    }

    return false;
  }

  isExistPermission(permissionString: string): boolean {
    for (const perm of this.config.permissions) {
      if(perm.id == permissionString){
        return true;
      }
    }

    return false;
  }

  hasRole(userRoleId: number, roles: Array<MiaRoleStatic>): boolean {
    for (const role of roles) {
      if(role.roleId == userRoleId){
        return true;
      }
    }
    return false;
  }

  getRoleStringToRoleNumber(roleNumber: number): string {
    for (const role of this.config.roles) {
      if(role.roleId == roleNumber){
        return role.id;
      }
    }

    return '';
  }

  getToRolesString(roles: Array<string>): Array<MiaRoleStatic> {
    let data = new Array<MiaRoleStatic>();
    for (const rolStringId of roles) {
      for (const role of this.config.roles) {
        if(rolStringId == role.id){
          data.push(role);
        }
      }
    }
    return data;
  }

  getConfigAllow(roleString: string): { role: string, permissions: [string]} | undefined {
    for (const allow of this.config.allow) {
      if(allow.role == roleString){
        return allow;
      }
    }

    return;
  }
}
