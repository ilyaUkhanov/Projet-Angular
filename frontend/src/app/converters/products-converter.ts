import {IProduct, IProductFromServer} from "../types/products";

export const CONVERTER_PRODUCTS = {
  serverToApp: (serverProduct: IProductFromServer): IProduct => {
    return { ...serverProduct, price: parseFloat(serverProduct.price) }
  }
}
