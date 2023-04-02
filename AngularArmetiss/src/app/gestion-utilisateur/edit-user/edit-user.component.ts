import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  template: `<app-user-form *ngIf="user" [user]="user"></app-user-form>`
})
export class EditUserComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route : ActivatedRoute,
    private userService: UserService
    ){}

  ngOnInit() {
    // on récupère l'id de l'user qui se trouve dans l'url
    const userId: number | null = Number(this.route.snapshot.paramMap.get('id'));
    if(userId){
      this.userService.getUserById(userId)
      .subscribe((data: any) => {
        this.user = data as User;
        this.user.confirm_pwd = this.user.User_Password;
        this.user.originalEmail = this.user.User_Email_Address;
      });

    } else {
      this.user = undefined;
    }

  }

}
