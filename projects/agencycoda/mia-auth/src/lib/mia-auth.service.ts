import { MiaResponse } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaToken } from './entities/mia-token';
import { MiaUser } from './entities/mia-user';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from './mia-auth.module';

export const MIA_AUTH_KEY_STORAGE_TOKEN = 'mia_auth.storage';

@Injectable({
  providedIn: 'root'
})
export class MiaAuthService {

  public currentUser = new BehaviorSubject<MiaToken>(new MiaToken());
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedOut = new Subject();

  constructor(
    @Inject(MIA_AUTH_PROVIDER) protected config: MiaAuthConfig,
    protected http: HttpClient,
    protected storage: StorageMap
  ) {
    this.initVerify();
  }

  register(user: MiaUser, password: string): Observable<MiaResponse<boolean>> {
    let params: any = user;
    params.password = password;
    params.platform = 2;
    return this.http.post<MiaResponse<boolean>>(this.config.baseUrl + 'mia-auth/register', params)
    .pipe(map(result => {
      if(result.success){
        return { success: true, response: true };
      }

      return result;
    }));
  }

  signInUser(user: MiaUser, password: string): Observable<MiaResponse<MiaToken>> {
    return this.signIn(user.email, password);
  }

  signIn(email: string, password: string): Observable<MiaResponse<MiaToken>> {
    return this.http.post<MiaResponse<MiaToken>>(this.config.baseUrl + 'mia-auth/login', { email: email, password: password })
    .pipe(map(result => {

      if(result.success){
        this.saveUser(result.response!);
      }

      return result;
    }));
  }

  signInWithGoogle(token: string): Observable<MiaResponse<MiaToken>> {
    return this.http.post<MiaResponse<MiaToken>>(this.config.baseUrl + 'mia-auth/login-with-google', { token: token })
    .pipe(map(result => {

      if(result.success){
        this.saveUser(result.response!);
      }

      return result;
    }));
  }

  logOut() {
    this.storage.delete(MIA_AUTH_KEY_STORAGE_TOKEN).subscribe();
    this.isLoggedIn.next(false);
    this.currentUser.next(new MiaToken());
    this.isLoggedOut.next();
  }

  changePasswordInRecovery(token: string, email: string, password: string): Observable<MiaResponse<boolean>> {
    return this.http.post<MiaResponse<boolean>>(this.config.baseUrl + 'mia-auth/change-password-recovery', { email: email, token: token, password: password});
  }

  recoveryPass(email: string): Observable<MiaResponse<boolean>> {
    return this.http.post<MiaResponse<boolean>>(this.config.baseUrl + 'mia-auth/recovery', { email: email});
  }

  me(): Observable<MiaResponse<MiaUser>> {
    return this.http.get<MiaResponse<MiaUser>>(this.config.baseUrl + 'mia-auth/me');
  }

  saveUser(user: MiaToken) {
    this.storage.set(MIA_AUTH_KEY_STORAGE_TOKEN, JSON.stringify(user)).subscribe();
    this.isLoggedIn.next(true);
  }

  verifyIfTokenValid() {
    this.me().subscribe(result => {
      if(result.success == false && result.error?.code == -2){
        this.logOut();
      }
    }, error => {

    });
  }

  initVerify() {
    this.getUser().subscribe(user => {
      if(user.access_token == '' || user.access_token == undefined){
        return;
      }

      this.isLoggedIn.next(true);
      this.currentUser.next(user);
    });
  }

  getUser(): Observable<MiaToken> {
    return this.storage.get<string>(MIA_AUTH_KEY_STORAGE_TOKEN, { type: 'string' })
    .pipe(map(data => {
      if(data == undefined || data == ''){
        return new MiaToken();
      }

      return JSON.parse(data);
    }));
  }

  getConfig() {
    return this.config;
  }
}
