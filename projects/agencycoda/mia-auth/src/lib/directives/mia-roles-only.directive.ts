import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MiaPermissionConfig, MIA_PERMISSION_PROVIDER } from '../mia-auth.module';
import { MiaAuthService } from '../mia-auth.service';
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
