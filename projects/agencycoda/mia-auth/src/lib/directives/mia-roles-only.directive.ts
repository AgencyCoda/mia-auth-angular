import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MiaPermissionService } from '../services/mia-permission.service';

@Directive({
  selector: '[miaRolesOnly]'
})
export class MiaRolesOnlyDirective {

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected permissionService: MiaPermissionService
  ) { }

  @Input()
  set miaRolesOnly(roles: Array<string>) {

    this.permissionService.validRoles(roles).subscribe(result => {
      if(result){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }else{
        this.viewContainer.clear();
      }
    });
  }

  
}
