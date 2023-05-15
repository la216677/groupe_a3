import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DeleteCategoryComponent } from './categories/delete-category/delete-category.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ProduitsComponent } from './produits/produits.component';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';
import { DeleteProductComponent } from './produits/delete-product/delete-product.component';
import { AddProductComponent } from './produits/add-product/add-product.component';
import { ProductFormComponent } from './produits/product-form/product-form.component';
import { EditProductComponent } from './produits/edit-product/edit-product.component';
import { NgxPaginationModule } from 'ngx-pagination';

const productManagementRoot : Routes = [
  { path: 'categories', component: CategoriesComponent},
  { path: 'produits', component: ProduitsComponent},
  { path: 'produits/add', component: AddProductComponent},
  { path: 'produits/edit/:id', component: EditProductComponent}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    DeleteCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ProduitsComponent,
    DeleteProductComponent,
    AddProductComponent,
    ProductFormComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(productManagementRoot),
    NgxPaginationModule
  ],
  providers: [
    CategoryService,
    ProductService
  ]
})
export class ProductManagementModule { }
