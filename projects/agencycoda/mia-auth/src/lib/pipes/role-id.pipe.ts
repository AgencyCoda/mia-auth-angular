import { Inject, Pipe, PipeTransform } from '@angular/core';
import { MiaPermissionConfig, MIA_PERMISSION_PROVIDER } from '../entities/mia-auth-config';

@Pipe({
  name: 'roleId'
})
export class RoleIdPipe implements PipeTransform {

  constructor(
    @Inject(MIA_PERMISSION_PROVIDER) protected config: MiaPermissionConfig,
  ){
    
  }

  transform(value: any): string {
    for (const role of this.config.roles) {
      if(role.roleId == parseInt(value)){
        return role.id;
      }
    }

    return '';
  }
}
