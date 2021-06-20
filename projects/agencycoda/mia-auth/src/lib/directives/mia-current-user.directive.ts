import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { MiaUser } from '../entities/mia-user';
import { MiaAuthService } from '../mia-auth.service';

@Directive({
  selector: '[miaCurrentUser]'
})
export class MiaCurrentUserDirective {

  currentUser?: MiaUser;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected authService: MiaAuthService
  ) {
    this.loadUser();
  }

  loadUser() {
    this.authService.currentUser.subscribe(result => {
      this.currentUser = result;
      this.printView();
    });
  }

  printView() {
    // Clean View
    this.viewContainer.clear();
    // Verify if logged
    if(this.currentUser == undefined || this.currentUser.id <= 0){
      return;
    }
    // Process view
    this.viewContainer.createEmbeddedView(this.templateRef, { currentUser: this.currentUser });
  }
}
