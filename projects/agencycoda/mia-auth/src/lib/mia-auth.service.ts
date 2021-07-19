import { MiaResponse } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from './entities/mia-auth-config';
import { MiaToken } from './entities/mia-token';
import { MiaUser } from './entities/mia-user';
import { MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER, MIA_AUTH_KEY_STORAGE_ROLES } from './services/mia-role.service';

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

  signInUserWithRole(user: MiaUser, password: string, roles: Array<number>): Observable<MiaResponse<MiaToken>> {
    return this.signIn(user.email, password)
    .pipe(map(result => {

      if(result.success){
        let hasPermission = false;
        for (const rol of roles) {
          if(rol == result.response!.role){
            hasPermission = true;
          }
        }

        if(!hasPermission){
          this.removeUser();
          result.success = false;
          result.error = {
            code: -5,
            message: 'Your account has not permission'
          };
        }
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

  signInWithFacebook(token: string): Observable<MiaResponse<MiaToken>> {
    return this.http.post<MiaResponse<MiaToken>>(this.config.baseUrl + 'mia-auth/login-with-facebook', { token: token })
    .pipe(map(result => {

      if(result.success){
        this.saveUser(result.response!);
      }

      return result;
    }));
  }

  logOut() {
    this.storage.delete(MIA_AUTH_KEY_STORAGE_TOKEN).subscribe();
    this.storage.delete(MIA_AUTH_KEY_STORAGE_ROLES).subscribe();
    this.storage.delete(MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER).subscribe();
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

  updateUser(user: any): Observable<MiaResponse<MiaUser>> {
    return this.http.post<MiaResponse<MiaUser>>(this.config.baseUrl + 'mia-auth/update-profile', user);
  }

  verifiedEmail(email: string, token: string): Observable<MiaResponse<boolean>> {
    return this.http.post<MiaResponse<boolean>>(this.config.baseUrl + 'mia-auth/verified-email', { email: email, token: token });
  }

  me(): Observable<MiaResponse<MiaUser>> {
    return this.http.get<MiaResponse<MiaUser>>(this.config.baseUrl + 'mia-auth/me')
    .pipe(map(result => {

      if(result.success){
        this.saveMeWithToken(result.response!);
      } else if (result.error && result.error!.code == -2) {
        this.logOut();
      }

      return result;
    }));;
  }

  saveMeWithToken(user: MiaUser) {
    this.getUser().subscribe(result => {
      let newItem: MiaToken = user as MiaToken;
      newItem.token_type = 'bearer';
      newItem.access_token = result.access_token;
      this.saveUser(newItem);
    });
  }

  saveUser(user: MiaToken) {
    this.storage.set(MIA_AUTH_KEY_STORAGE_TOKEN, JSON.stringify(user)).subscribe();
    this.currentUser.next(user);
    this.isLoggedIn.next(true);
  }

  removeUser() {
    this.storage.delete(MIA_AUTH_KEY_STORAGE_TOKEN).subscribe();
    this.currentUser.next(new MiaToken());
    this.isLoggedIn.next(false);
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
