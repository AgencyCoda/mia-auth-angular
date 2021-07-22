import { MiaAuthService } from '@agencycoda/mia-auth';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export class MiaForgoPassPageConfig {
  titlePage = '';
  logoImage = '';
  imageRight = '';
  routeHome = '/';
  routeLogin = '/auth/login';
}

@Component({
  selector: 'lib-mia-forgot-pass',
  templateUrl: './mia-forgot-pass.component.html',
  styleUrls: ['./mia-forgot-pass.component.scss']
})
export class MiaForgotPassComponent implements OnInit {

  config!: MiaForgoPassPageConfig;

  isLoading = false;
  isSend = false;

  inputEmail = new FormControl('');

  messageError = '';

  constructor(
    protected authService: MiaAuthService,
    protected navigator: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadConfig();
  }

  onClickRecovery() {
    // Clean message Error
    this.messageError = '';
    
    if (this.inputEmail.value == '') {
      this.messageError = 'You must enter your Email address';
      return;
    }

    this.isLoading = true;

    this.authService.recoveryPass(this.inputEmail.value).subscribe(data => {
      this.isLoading = false;
      if(!data.success){
        this.isSend = false;
        this.messageError = data.error?.message ?? '';
        return;
      }
      this.isSend = true;
    }, error => {
      this.isLoading = false;
      this.isSend = false;
      if(error.message){
        this.messageError = error.message;
      }
    });
  }

  loadConfig() {
    this.route.data.subscribe(result => {
      this.config = result as MiaForgoPassPageConfig;
    });
  }
}
