import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

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
