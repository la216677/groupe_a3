import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { Users } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: Users ; // on attend un objet user en entrée
  @ViewChild('userForm') userForm: NgForm; //va nous permettre de vérifier le form
  passwordsMatch:boolean = true; // pour verifier si les mdp sont égales
  isAddForm: boolean; // pour verifier si nous somme dans un formulaire d'ajout

  roles:Role[];
  error:any;
  emailExists: boolean = false;


  constructor(
    private userService: UserService,
     private router: Router,
     ) {}

  /*
  * récuperer les different roles
  */

  ngOnInit() {
    this.isAddForm = this.router.url.includes('add');

    if (!this.isAddForm) {
      this.user.originalEmail = this.user.email;
    }

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
        this.error = err;
      }
    );

  }
  /*
  *Validation du form
  */
  onSubmit(){

    if(this.isAddForm){
      this.user.activity = true;
      this.userService.addUser(this.user)
      .subscribe(()=>this.router.navigate(['/addUser']));
    }
  }



  // Fonction pour vérifier si les deux mots de passe sont identiques
  checkPasswords() {
      this.passwordsMatch = this.user.pwd === this.user.confirm_pwd;
      return this.passwordsMatch;
  }

  checkEmail(email: string) {
    if (email === this.user.originalEmail) { // Vérifier si l'adresse e-mail est identique à l'adresse e-mail d'origine
      return false; // Si oui, retourner false
    } else {
      this.userService.checkEmailExists(email).subscribe(
        (exists: boolean) => {
          if (exists) {
            this.emailExists = true;
          } else {
            this.emailExists = false;
          }
        }
      );
      return this.emailExists;
    }
  }
    }
