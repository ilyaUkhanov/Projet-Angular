import {IProduct} from "../types/products";

export interface IRemoveProductPanierAction {
  product: IProduct;
}

export class RemoveProductPanierAction {
  static readonly type = '[Product] Remove Panier';
  constructor(public product: IProduct) {}
}
