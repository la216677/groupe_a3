import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProductManagementService } from './product-management.service';
import { DeleteCategoryComponent } from './categories/delete-category/delete-category.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';

const productManagementRoot : Routes = [
  { path: 'categories', component: CategoriesComponent}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    DeleteCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(productManagementRoot)
  ],
  providers: [ProductManagementService]
})
export class ProductManagementModule { }
