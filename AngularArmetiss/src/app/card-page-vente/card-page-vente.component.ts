import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-page-vente',
  templateUrl: './card-page-vente.component.html',
  styleUrls: ['./card-page-vente.component.css']
})
export class CardPageVenteComponent implements OnInit {

  // @Input() card!: CardPage;
  @Input() title!: String;
  @Input() urlImage!: String;

  // title!: String;
  // urlImage!: String;

  ngOnInit() {

    // this.title = "test";
    // this.urlImage = "assets/test.png"

  }
}
