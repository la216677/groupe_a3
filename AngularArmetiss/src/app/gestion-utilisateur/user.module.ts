import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';




@NgModule({
  declarations: [
    AddUserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [UserService]
})
export class UserModule { }
