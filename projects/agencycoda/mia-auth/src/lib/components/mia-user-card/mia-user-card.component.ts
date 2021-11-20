import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MiaUser } from '../../entities/mia-user';

@Component({
  selector: 'mia-user-card',
  templateUrl: './mia-user-card.component.html',
  styleUrls: ['./mia-user-card.component.scss']
})
export class MiaUserCardComponent implements OnInit {

  @Input() user!: MiaUser;
  @Input() showButtonEdit = true;
  @Input() fields: Array<{ title: string, key: string }> = [
    { title: 'ID', key: 'id' },
    { title: 'Firstname', key: 'firstname' },
    { title: 'Lastname', key: 'lastname' },
    { title: 'Email', key: 'email' },
    { title: 'Phone', key: 'phone' },
  ];
  @Input() fieldsExtra: Array<{ title: string, value: string }> = [];

  @Output() clickEdit = new EventEmitter();
  @Output() clickChangePassword = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getValue(key: string) {
    let data: any = this.user;
    return data[key];
  }

  onClickEdit() {
    this.clickEdit.emit();
  }

  onClickChangePassword() {
    this.clickChangePassword.emit();
  }
}
