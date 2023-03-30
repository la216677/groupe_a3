import { Component, OnInit } from '@angular/core';
import { Users } from '../models/user';

@Component({
  selector: 'app-add-user',
  template: `
  <app-user-form [user]="user"></app-user-form>
  `
})
export class AddUserComponent implements OnInit {

  user: Users;

  ngOnInit() {
    this.user = new Users();
  }

}
