
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MiaPermissionService } from '../services/mia-permission.service';

@Directive({
  selector: '[miaPermissionOnly]'
})
export class MiaPermissionOnlyDirective {

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected permissionService: MiaPermissionService
  ) { }

  @Input()
  set miaPermissionOnly(permissionString: string) {

    this.permissionService.validPermission(permissionString).subscribe(result => {
      if(result){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }else{
        this.viewContainer.clear();
      }
    });
  }

  
}
