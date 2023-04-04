import {IProduct} from "../types/products";

export interface IAddProductPanierAction {
  product: IProduct;
}

export class AddProductPanierAction {
  static readonly type = '[Product] Add Panier';
  constructor(public product: IProduct) {}
}
