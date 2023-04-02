import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html'
})
export class ConfirmDeleteComponent implements OnInit {

  userId: number;
  onClose: Subject<any> = new Subject();
  boutonDesactive: boolean;

  constructor(
    public modalRef: BsModalRef,
    private userService : UserService,
    private router: Router
    ) {}

    ngOnInit() {
      //on verifie si content, intialState et userId existe bien, sinon un message d'erreur apparait
      if (this.modalRef.content && this.modalRef.content.initialState && this.modalRef.content.initialState.userId) {
        this.userId = this.modalRef.content.initialState.userId;
      }


    }

  confirm(): void {
    this.boutonDesactive = true;
    this.userService.deleteUserById(this.userId)
    .subscribe(() => {
      this.goToUserList;
      this.modalRef.hide();
    });

    setTimeout(() => { //on bloque le bouton pendant 5 seconde après un click
      this.boutonDesactive = false;
    }, 5000);

  }



  cancel(): void {
    this.modalRef.hide();
  }

  goToUserList(){
    this.router.navigate(['/users']);
  }

}
