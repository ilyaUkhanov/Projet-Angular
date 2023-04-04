import {IProduct} from "../types/products";

export interface IRemoveProductAction {
  product: IProduct;
}

export class RemoveProductAction {
  static readonly type = '[Product] Remove';
  constructor(public product: IProduct) {}
}
