import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MiaAuthService } from '../../mia-auth.service';

export class MiaLoginPageConfig {
  titlePage = '';
  logoImage = '';
  imageRight = '';
  routeHome = '/';
  routeSuccess = '/';
  routeRegister = '/auth/register';
  routeRecovery = '/auth/recovery';
  hasLoginWithGoogle = false;
}
@Component({
  selector: 'mia-login',
  templateUrl: './mia-login.component.html',
  styleUrls: ['./mia-login.component.scss']
})
export class MiaLoginComponent implements OnInit {

  config!: MiaLoginPageConfig;

  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  isLoading = false;
  hidePassword = true;
  messageError = '';

  constructor(
    protected authService: MiaAuthService,
    protected navigator: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadConfig();
    this.processConfig();
  }

  onClickLogin() {
    // Limpiar mensaje de error
    this.messageError = '';
    // Verificar si ingreso el email
    if (this.formGroup.get('email')!.value == '') {
      this.messageError = 'You must enter email address';
      return;
    }
    if (this.formGroup.get('password')!.value == '') {
      this.messageError = 'You must password';
      return;
    }

    this.isLoading = true;
    this.authService.signIn(this.formGroup.get('email')!.value, this.formGroup.get('password')!.value).subscribe(data => {
       this.isLoading = false;
       if (data.success) {
        this.navigator.navigateByUrl('/');
       } else {
         this.messageError = data.error!.message;
       }
     });
  }

  loginWithGoogle() {

  }

  processConfig() {
    this.route.queryParams
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

  loadConfig() {
    this.route.data.subscribe(result => {
      this.config = result as MiaLoginPageConfig;
    });
  }
}
