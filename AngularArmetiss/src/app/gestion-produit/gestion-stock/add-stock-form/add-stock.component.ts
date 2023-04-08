import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../models/stock';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {
  @Input() stock: Stock;

  addStock(quantity: string, price: string, purchaseDate: string, provider: string) {
    
  }
}
