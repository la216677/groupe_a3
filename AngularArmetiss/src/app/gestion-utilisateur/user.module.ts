import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { RouterModule, Routes } from '@angular/router';

const userRoutes: Routes = [
  { path: 'users', component: ListUserComponent},
  { path: 'users/add', component: AddUserComponent},
  { path: 'users/edit/:id', component: EditUserComponent}
];


@NgModule({
  declarations: [
    AddUserComponent,
    UserFormComponent,
    EditUserComponent,
    ListUserComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(userRoutes)
  ],
  providers: [UserService]
})
export class UserModule { }
