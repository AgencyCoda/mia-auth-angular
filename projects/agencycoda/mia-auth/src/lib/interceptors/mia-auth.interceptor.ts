import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MiaAuthService } from '../mia-auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MiaAuthInterceptor implements HttpInterceptor {

  constructor(
    protected authService: MiaAuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.indexOf('storage.googleapis.com') >= 0){
      return next.handle(request.clone());
    }

    return this.authService.getUser().pipe(switchMap(user => {
      return next.handle(request.clone({
        setHeaders: { 'Authorization': 'Bearer ' + user.access_token }
      }))
    }));
  }
}
