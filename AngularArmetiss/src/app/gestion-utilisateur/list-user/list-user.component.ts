import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  modalRef: BsModalRef;

  userList: User[];
  roles: Role[];

  totalRecords:number;
  page:number=1;

  searchTerm: string; // Terme de recherche
  filteredUserList: User[]; // Liste des produits filtrés

  flag: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: BsModalService,
    private cookieService : CookieService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getRole();
    this.flag = false;
    if(this.cookieService.get('roleId')!="3"){
      this.router.navigate(['menu']);
    }
  }


  //on récupère tout les user de la db
  getUser(){
    this.userService.getUserList()
    .subscribe(
      (data: User[]) => {
        this.userList = data;
        this.totalRecords = data.length;
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }

    );
  }

  //on récupère tout les roles de la db
  getRole(){
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

  filterUsers() {
    this.flag = true;
    if (this.searchTerm) {
      // Si un terme de recherche est saisi
      this.filteredUserList = this.userList.filter(
        user => user.User_First_Name.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-")) // replace(/ /, "-") remplace les tirer par des espaces
        || user.User_Last_Name.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-"))
        || user.User_Email_Address.toLowerCase().replace(/ /, "-").includes(this.searchTerm.toLowerCase().replace(/ /, "-"))

        ); // Filtrer les produits par terme de recherche avec correspondance insensible à la casse et aux espaces
    } else {
      this.filteredUserList = this.userList; // Si aucun terme de recherche n'est saisi, afficher tous les produits
    }
  }

  sortDirection = 1;

  sort(column: keyof User) {
    this.userList = this.userList.sort((a: User, b: User) => {
      if (a[column] < b[column]) {
        return -1 * this.sortDirection;
      } else if (a[column] > b[column]) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
    this.sortDirection = this.sortDirection * -1;
  }
  //Aller a la page d'ajout
  goToAddUser(){
    this.router.navigate(['users/add']);
  }

  //aller a la page d'edit
  goToEditUser(id:number){
    this.router.navigate([`users/edit/${id}`]);
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
        this.getUser();
      });
    }
  }


}
