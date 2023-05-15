import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { StockComponent } from './stock/stock.component';
import { FormsModule } from '@angular/forms';
import { HistoriqueStockComponent } from './historique-stock/historique-stock.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    ListProductComponent,
    StockComponent,
    HistoriqueStockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class GestionStockModule { }
