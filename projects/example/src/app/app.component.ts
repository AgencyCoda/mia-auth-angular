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

  constructor(
    protected roleService: MiaRoleService
  ) {
    
  }

  ngOnInit(): void {
    /*this.roleService.listOb(new MiaQuery()).subscribe(result => {
      console.log(result);
    });*/
  }
}
