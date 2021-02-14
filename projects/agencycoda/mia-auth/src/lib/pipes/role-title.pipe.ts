import { Pipe, PipeTransform } from '@angular/core';
import { MiaRole } from '../entities/mia-role';
import { MiaRoleService } from '../services/mia-role.service';

@Pipe({
  name: 'roleTitle'
})
export class RoleTitlePipe implements PipeTransform {

  roles?: Array<MiaRole>;

  constructor(
    protected roleService: MiaRoleService
  ){

  }

  transform(value: number): string {
    if(this.roles == undefined){
      return value + '';
    }

    for (const role of this.roles) {
      if(role.id == value){
        return role.title;
      }
    }

    return '';
  }

}
