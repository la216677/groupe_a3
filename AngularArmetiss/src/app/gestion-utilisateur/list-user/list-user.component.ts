import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  modalRef: BsModalRef;

  userList: User[];
  roles: Role[];


  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getUserInit();
    this.getRoleInit();

  }


  //on récupère tout les user de la db
  getUserInit(){
    this.userService.getUserList()
    .subscribe(
      (data: User[]) => {
        this.userList = data;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  //on récupère tout les roles de la db
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
*On recherche le rôle correspondant à l'id donné dans le tableau de rôles grâce à la méthode find()
*On utilise ici la syntaxe "roles?.find()" pour éviter une erreur si "roles" est nul ou indéfini.
*Si le rôle est trouvé, on retourne son nom, sinon on retourne une chaîne de caractères vide.
*/
  getRoleName(id: number): string {
    const role = this.roles?.find(role => role.ID_Role === id);
    return role ? role.Role : '';
  }


  //Aller a la page d'ajout
  goToAddUser(){
    this.router.navigate(['users/add'])
  }

  //aller a la page d'edit
  goToEditUser(id:number){
    this.router.navigate([`users/edit/${id}`])
  }


  // ouverture d'un message de confirmation lors de la suppression
  openConfirmationDeleteModal(userId: number) {
    const initialState = {
      userId: userId
    };
    this.modalRef = this.modalService.show(ConfirmDeleteComponent, { initialState }); // on envoie l'id au modal
    if (this.modalRef) { //on verifie si il existe pour eviter des erreur
      //lorsque le modal est fermer on raffraichi la liste d'utilisateur
      this.modalRef.onHidden?.subscribe(() => {
        this.getUserInit();
      });
    }
  }


}
