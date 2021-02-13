import { Pipe, PipeTransform } from '@angular/core';
import { MiaAuthService } from '../mia-auth.service';

@Pipe({
  name: 'currentUser'
})
export class CurrentUserPipe implements PipeTransform {

  constructor(
    protected authService: MiaAuthService
  ){

  }
    
  transform(value: string): any {
    const user: any = this.authService.currentUser.value;
    return user[value];
  }

}
