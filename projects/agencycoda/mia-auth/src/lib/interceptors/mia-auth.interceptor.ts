import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MiaAuthService } from '../mia-auth.service';
import { switchMap } from 'rxjs/operators';

export const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);
@Injectable()
export class MiaAuthInterceptor implements HttpInterceptor {

  constructor(
    protected authService: MiaAuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.indexOf('maps.googleapis.com') >= 0){
      return next.handle(request.clone());
    }

    if(request.url.indexOf('storage.googleapis.com') >= 0){
      return next.handle(request.clone());
    }

    if (request.context.get(IS_PUBLIC_API)) {
      return next.handle(request);
    }

    return this.authService.getUser().pipe(switchMap(user => {
      return next.handle(request.clone({
        setHeaders: { 'Authorization': 'Bearer ' + user.access_token }
      }))
    }));
  }
}
