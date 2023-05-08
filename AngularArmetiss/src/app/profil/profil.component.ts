import { Component,OnInit } from '@angular/core';
import { User } from '../gestion-utilisateur/models/user';
import { UserService } from '../gestion-utilisateur/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User | undefined;
  roleStr: string = "";
  constructor(
    private cookieService: CookieService,
    private userService: UserService
    ){}

  ngOnInit() {
    this.getUser();
    this.getRole();
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


    getRole(){
      var role: string = this.cookieService.get('roleId');
      var roleInt : number = parseInt(role);

      if(roleInt == 1)
        this.roleStr = "Vendeur";
      else if(roleInt == 2)
        this.roleStr = "Responsable";
      else if(roleInt == 3)
        this.roleStr = "Administrateur";
    }
    nom = "Doe";
    prenom = "John";
    email = "doe.john@gmail.com";
    date_naissance = "01/01/1990";

}
