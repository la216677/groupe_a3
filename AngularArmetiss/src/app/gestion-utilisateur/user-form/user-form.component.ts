import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User ; // on attend un objet user en entrée
  @ViewChild('userForm') userForm: NgForm; //va nous permettre de vérifier le form
  passwordsMatch:boolean = true; // pour verifier si les mdp sont égales
  isAddForm: boolean; // pour verifier si nous somme dans un formulaire d'ajout
  editMode:boolean = false;

  roles:Role[];
  emailExists: boolean = false;
  boutonDesactive: boolean;


  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
     ) {}

  /*
  * récuperer les different roles
  */

  ngOnInit() {
    this.isAddForm = this.router.url.includes('add');
    this.getRoleInit();
  }

  getRoleInit(){
    this.userService.getRole().subscribe(
      //on envoie les donne sous forme de type Role[] en cas de réussite
      (data: Role[]) => {
        this.roles = data;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );

  }
  /*
  *Validation du form
  */
  onSubmit(){
    this.boutonDesactive = true;
    if(this.isAddForm){
      this.user.User_Activity = true;
      this.userService.addUser(this.user)
      .subscribe(()=>this.router.navigate(['/users']));
    } else {
      if(this.user.Id_User==+this.cookieService.get('userId')){
        this.cookieService.set('roleId', this.user.Id_Role.toString());
      }
      this.userService.updateUser(this.user)
      .subscribe(()=>this.router.navigate(['/users']));

    }
    setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
      this.boutonDesactive = false;
    }, 5000);

  }



  // Fonction pour vérifier si les deux mots de passe sont identiques
  checkPasswords() {
      this.passwordsMatch = this.user.User_Password === this.user.confirm_pwd;
      return this.passwordsMatch;
  }

  //si on appuie sur le bouton modifier mdp
  updatePwd(){
    this.resetPassword();
    this.editMode = true;
  }

  /*
  *Mettre les champs mdp a 0 lors d'un edit
  */
  resetPassword() {
    this.user.User_Password = '';
    this.user.confirm_pwd = '';
  }

  /*
  * on vérifie si l'email existe deja
  */

  checkOriginalEmail(email: string): boolean {
    return email === this.user.originalEmail;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.userService.checkEmailExists(email);
  }

  checkEmail(email: string) {
    if (this.checkOriginalEmail(email)) {
      this.emailExists = false;
    } else {
      this.checkEmailExists(email).subscribe(
        (exists: boolean) => {
          this.emailExists = exists;
        }
      );
    }
  }


  }
