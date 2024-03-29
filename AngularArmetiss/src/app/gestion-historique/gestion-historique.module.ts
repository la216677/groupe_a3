import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoSaleComponent } from './histo-sale/histo-sale.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DetailSaleComponent } from './detail-sale/detail-sale.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    HistoSaleComponent,
    DetailSaleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule
  ]
})
export class GestionHistoriqueModule { }
