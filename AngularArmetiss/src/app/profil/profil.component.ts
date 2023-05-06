import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../gestion-utilisateur/models/user';
import { UserService } from '../gestion-utilisateur/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User;
  constructor(
    private cookieService: CookieService,
    private userService: UserService
    ){}

  ngOnInit() {
    this.getUser();
    console.log(this.user);
  }

  getUser(){
    var id: string = this.cookieService.get('userId');
    var idInt : number = parseInt(id);
    this.userService.getUserById(idInt).subscribe(
      (data: User | undefined) => {
        if(data)
          this.user = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


    nom = "Doe";
    prenom = "John";
    email = "doe.john@gmail.com";
    date_naissance = "01/01/1990";

}
