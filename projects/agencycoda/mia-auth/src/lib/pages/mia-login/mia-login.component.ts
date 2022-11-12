import { MiaResponse } from '@agencycoda/mia-core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MiaToken } from '../../entities/mia-token';
import { MiaUser } from '../../entities/mia-user';
import { MiaAuthService } from '../../mia-auth.service';

export class MiaLoginPageConfig {
  titlePage = '';
  logoImage = '';
  imageRight = '';
  emailLabel = 'Email address';
  emailPlaceholder = 'yourEmail@company.com';
  passwordLabel = 'Password';
  forgotPasswordLabel = 'Forgot password';
  loginButtonLabel = 'LOG IN';
  loginGoogleButtonLabel = 'LOG IN With Google';
  signupLinkText = 'Don’t have an account? Sign Up';
  routeHome = '/';
  routeSuccess = '/';
  routeRegister = '/auth/register';
  routeRecovery = '/auth/recovery';
  hasLoginWithGoogle = false;
  hasRegister = true;
  hasRecoveryPassword = true;
  phrase?= '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed enim”';
  roles = [];
  errorMessageEmail? = 'You must enter email address';
  errorMessagePassword? = 'You must password';
  textLoading? = 'Loading...';
}
@Component({
  selector: 'mia-login',
  templateUrl: './mia-login.component.html',
  styleUrls: ['./mia-login.component.scss']
})
export class MiaLoginComponent implements OnInit, OnDestroy {

  config!: MiaLoginPageConfig;

  formGroup = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });

  isLoading = false;
  hidePassword = true;
  messageError = '';

  subscription?: Subscription;

  constructor(
    protected authService: MiaAuthService,
    protected navigator: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnDestroy(): void {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  onClickLogin() {
    // Limpiar mensaje de error
    this.messageError = '';
    // Verificar si ingreso el email
    if (this.formGroup.get('email')!.value == '') {
      this.messageError = this.config.errorMessageEmail ?? 'You must enter email address';
      return;
    }
    if (this.formGroup.get('password')!.value == '') {
      this.messageError = this.config.errorMessagePassword ?? 'You must password';
      return;
    }

    this.isLoading = true;
    let obs: Observable<MiaToken>;
    if (this.config.roles.length == 0) {
      obs = this.authService.signIn(this.formGroup.get('email')!.value, this.formGroup.get('password')!.value);
    } else {
      let user = new MiaUser();
      user.email = this.formGroup.get('email')!.value;
      obs = this.authService.signInUserWithRole(user, this.formGroup.get('password')!.value, this.config.roles);
    }
    obs.subscribe(data => {
      this.isLoading = false;
      this.navigator.navigateByUrl(this.config.routeSuccess);
    }, error => {
      this.isLoading = false;
      if (error && error.message) {
        this.messageError = error.message;
      }
    });
  }

  loginWithGoogle() {

  }

  loadConfig() {
    this.subscription = this.route.data
      .pipe(switchMap(result => {
        this.config = result as MiaLoginPageConfig;
        return this.route.queryParams;
      }))
      .pipe(
        switchMap((params) => {
          const redirect = params.redirect;
          if (
            redirect !== '/login' &&
            redirect !== '/' &&
            redirect !== '' &&
            redirect !== null &&
            redirect !== undefined &&
            redirect !== '%2F' &&
            redirect !== '/login;redirect=%2F'
          ) {
            this.config.routeSuccess = redirect;
          }

          return this.authService.isLoggedIn;
        })
      )
      .subscribe((isLogged) => {
        if (isLogged) {
          this.navigator.navigateByUrl(this.config.routeSuccess);
        }
        return this.authService.getUser();
      });
  }
}
