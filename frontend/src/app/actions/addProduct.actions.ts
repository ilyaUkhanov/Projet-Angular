import {IProduct} from "../types/products";

export interface IAddProductAction {
  product: IProduct;
}

export class AddProductAction {
  static readonly type = '[Product] Add';
  constructor(public product: IProduct) {}
}
