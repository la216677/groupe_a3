import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { StockComponent } from './stock/stock.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ListProductComponent,
    StockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GestionStockModule { }
