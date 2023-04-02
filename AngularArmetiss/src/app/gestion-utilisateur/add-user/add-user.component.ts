import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-add-user',
  template: `
  <app-user-form [user]="user"></app-user-form>
  `
})
export class AddUserComponent implements OnInit {

  user: User;

  ngOnInit() {
    this.user = new User();
  }

}
