import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaRoleStatic } from '../entities/mia-role';
import { MiaPermissionConfig, MIA_PERMISSION_PROVIDER } from '../mia-auth.module';
import { MiaAuthService } from '../mia-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MiaPermissionService {

  constructor(
    protected authService: MiaAuthService,
    @Inject(MIA_PERMISSION_PROVIDER) protected config: MiaPermissionConfig,
  ) { }

  validRoles(rolesString: Array<string>): Observable<boolean> {
    let roles = this.getToRolesString(rolesString);
    return this.authService.getUser().pipe(map(user => {
      if(user.id == 0){
        return false;
      }
      return this.hasRole(user.role, roles);
    }));
  }

  hasRole(userRoleId: number, roles: Array<MiaRoleStatic>): boolean {
    for (const role of roles) {
      if(role.roleId == userRoleId){
        return true;
      }
    }
    return false;
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
}
