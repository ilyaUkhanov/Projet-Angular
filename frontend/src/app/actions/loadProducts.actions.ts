import {IProduct} from "../types/products";

export interface ILoadProductsAction {
  products: IProduct[];
}

export class LoadProductAction {
  static readonly type = '[Product] Load';
  constructor(public products: IProduct[]) {}
}
