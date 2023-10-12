import { MiaBaseHttpService, MiaCoreConfig, MiaResponse, MIA_CORE_PROVIDER } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MiaAuthConfig, MIA_AUTH_PROVIDER } from './entities/mia-auth-config';
import { MiaToken } from './entities/mia-token';
import { MiaUser } from './entities/mia-user';
import { MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER, MIA_AUTH_KEY_STORAGE_ROLES } from './services/mia-role.service';

export const MIA_AUTH_KEY_STORAGE_TOKEN = 'mia_auth.storage';

@Injectable({
  providedIn: 'root'
})
export class MiaAuthService extends MiaBaseHttpService {

  /**
   * V2:
   * Solo se ejecuta cuando se loguea o determinamos que el usuario ya estaba con la sesion iniciada
   */
  public onLoggedIn = new Subject<boolean>();

  public currentUser = new BehaviorSubject<MiaToken>(new MiaToken());
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedOut = new Subject();

  constructor(
    @Inject(MIA_CORE_PROVIDER) protected config: MiaCoreConfig,
    protected http: HttpClient,
    protected storage: StorageMap
  ) {
    super(config, http);
    this.initVerify();
  }

  register(user: MiaUser, password: string, lang?: string): Observable<MiaResponse<boolean>> {
    let params: any = user;
    params.password = password;
    params.platform = 2;
    params.lang = lang;
    return this.post(this.config.baseUrl + 'mia-auth/register', params);
  }

  signInUser(user: MiaUser, password: string): Observable<MiaToken> {
    return this.signIn(user.email, password);
  }

  signIn(email: string, password: string): Observable<MiaToken> {
    //return this.http.post<MiaToken>(this.config.baseUrl + 'mia-auth/login', { email: email, password: password })
    return this.post<MiaToken>(this.config.baseUrl + 'mia-auth/login', { email: email, password: password, lang: this.config.lang })
    .pipe(map(result => {
      this.saveUser(result);
      this.onLoggedIn.next(true);
      this.isLoggedIn.next(true);
      return result;
    }));
  }

  signInUserWithRole(user: MiaUser, password: string, roles: Array<number>): Observable<MiaToken> {
    return this.signIn(user.email, password)
    .pipe(map(result => {

        let hasPermission = false;
        for (const rol of roles) {
          if(rol == result.role){
            hasPermission = true;
          }
        }

        if(!hasPermission){
          this.removeUser();
          if(this.config.lang == 'es'){
            throw {code: -5, message: 'Tu cuenta no posee permisos.'};
          } else {
            throw {code: -5, message: 'Your account has not permission'};
          }

        }

      return result;
    }));
  }

  signInWithApple(token: string): Observable<MiaToken> {
    return this.post<MiaToken>(this.config.baseUrl + 'mia-auth/login-with-apple', { token: token })
    .pipe(map(result => {
      this.saveUser(result);
      this.onLoggedIn.next(true);
      this.isLoggedIn.next(true);
      return result;
    }));
  }

  signInWithGoogle(token: string): Observable<MiaToken> {
    return this.post<MiaToken>(this.config.baseUrl + 'mia-auth/login-with-google', { token: token })
    .pipe(map(result => {
      this.saveUser(result);
      this.onLoggedIn.next(true);
      this.isLoggedIn.next(true);
      return result;
    }));
  }

  signInWithFacebook(token: string): Observable<MiaToken> {
    return this.post<MiaToken>(this.config.baseUrl + 'mia-auth/login-with-facebook', { token: token })
    .pipe(map(result => {
      this.saveUser(result);
      this.onLoggedIn.next(true);
      this.isLoggedIn.next(true);
      return result;
    }));
  }

  logOut() {
    this.storage.delete(MIA_AUTH_KEY_STORAGE_TOKEN).subscribe();
    this.storage.delete(MIA_AUTH_KEY_STORAGE_ROLES).subscribe();
    this.storage.delete(MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER).subscribe();
    this.isLoggedIn.next(false);
    this.currentUser.next(new MiaToken());
    this.isLoggedOut.next(true);
  }

  logOut2(): Observable<any> {
    return this.storage.delete(MIA_AUTH_KEY_STORAGE_TOKEN)
    .pipe(switchMap(r => this.storage.delete(MIA_AUTH_KEY_STORAGE_ROLES)))
    .pipe(switchMap(r => this.storage.delete(MIA_AUTH_KEY_STORAGE_PERMISSIONS_BY_USER)))
    .pipe(tap(r => this.isLoggedIn.next(false)))
    .pipe(tap(r => this.currentUser.next(new MiaToken())))
    .pipe(tap(r => this.isLoggedOut.next(true)));
  }

  changePasswordInRecovery(token: string, email: string, password: string): Observable<MiaResponse<boolean>> {
    return this.post(this.config.baseUrl + 'mia-auth/change-password-recovery', { email: email, token: token, password: password, lang: this.config.lang});
  }

  recoveryPass(email: string, lang?: string): Observable<MiaResponse<boolean>> {
    return this.post(this.config.baseUrl + 'mia-auth/recovery', { email: email, lang: lang });
  }

  updateUser(user: any): Observable<MiaUser> {
    return this.post(this.config.baseUrl + 'mia-auth/update-profile', user);
  }

  verifiedEmail(email: string, token: string, lang?: string): Observable<MiaResponse<boolean>> {
    return this.post(this.config.baseUrl + 'mia-auth/verified-email', { email: email, token: token, lang: lang });
  }

  me(): Observable<MiaResponse<MiaUser>> {
    return this.get(this.config.baseUrl + 'mia-auth/me')
    .pipe(map(result => {
      this.saveMeWithToken(result);
      //} else if (result.error && result.error!.code == -2) {
      //  this.logOut();
      //}

      return result;
    }))
    .pipe(catchError(err => {
      this.logOut();
      throw err;
    }));
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
      this.onLoggedIn.next(true);
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
