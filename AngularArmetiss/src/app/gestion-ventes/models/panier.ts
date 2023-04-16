import { Product } from "src/app/gestion-produit/models/product";

export class Panier{
  basket:[Product, number][];
  totalPrice:number;
  client:string;
}
