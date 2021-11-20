import { MiaUser } from '@agencycoda/mia-auth';
import { MiaQuery } from '@agencycoda/mia-core';
import { Component, OnInit } from '@angular/core';
import { MiaRoleService } from 'projects/agencycoda/mia-auth/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'example';

  user = new MiaUser();
  extras = [
    { title: 'Pepedasd', value: 'aslkdjaslkjdaslk' }
  ];

  constructor(
    protected roleService: MiaRoleService
  ) {
    
  }

  ngOnInit(): void {
    this.loadUser();
    /*this.roleService.listOb(new MiaQuery()).subscribe(result => {
      console.log(result);
    });*/
  }

  clickEdit() {
    alert('Hizo click en edit');
  }

  clickChangePassword() {
    alert('Hizo click en Change password');
  }

  loadUser() {
    this.user.firstname = 'Matias';
    this.user.lastname = 'Camiletti';
    this.user.email = 'matias@agencycoda.com';
    this.user.phone = '541111111';
  }
}
