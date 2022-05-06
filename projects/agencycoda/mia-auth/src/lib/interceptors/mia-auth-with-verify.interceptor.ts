import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MiaAuthService } from '../mia-auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class MiaAuthWithVerifyInterceptor implements HttpInterceptor {

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

    return this.authService.getUser().pipe(switchMap(user => {
      return next.handle(request.clone({
        setHeaders: { 'Authorization': 'Bearer ' + user.access_token }
      }))
      .pipe(tap(evt => {
        if (evt instanceof HttpResponse && evt.body && evt.body.success == false && evt.body.error && evt.body.error.code == -2) {
          this.authService.logOut2().subscribe(res => window.location.reload());
        }
      }))
      /*.pipe(catchError((error: HttpErrorResponse) => {
        if(error){

        }

        return throwError(error);
      }));*/
      
    }));
  }
}
