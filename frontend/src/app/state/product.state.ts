import { Injectable } from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {ProductsRepositoryService} from "../services/products-repository.service";
import {AddProductAction, IAddProductAction} from "../actions/addProduct.actions";
import {IProduct} from "../types/products";
import {IRemoveProductAction, RemoveProductAction} from "../actions/removeProduct.actions";
import {AddProductPanierAction, IAddProductPanierAction} from "../actions/addProductPanier.actions";
import {IRemoveProductPanierAction, RemoveProductPanierAction} from "../actions/removeProductPanier.actions";

export type IProductState = {
  products: IProduct[];
  panierProducts: IProduct[];
};

@State<IProductState>({
  name: 'products',
  defaults: { products: [], panierProducts: [] }
})
@Injectable()
export class ProductState {
  constructor(private productsRepositoryService: ProductsRepositoryService) {}

  // PRODUITS
  @Action(AddProductAction)
  addProduct(context: StateContext<IProductState>, action: IAddProductAction) {
    const state = context.getState();
    context.setState({
      ...state,
      products: [
        ...state.products,
        action.product
      ]
    });
  }

  @Action(RemoveProductAction)
  removeProduct(context: StateContext<IProductState>, action: IRemoveProductAction) {
    const state = context.getState();
    context.setState({
      ...state,
      products: [
        ...state.products.filter(prod => prod.id !== action.product.id),
      ]
    });
  }

  // PANIER
  @Action(AddProductPanierAction)
  addProductPanierAction(context: StateContext<IProductState>, action: IAddProductPanierAction) {
    const state = context.getState();
    context.setState({
      ...state,
      panierProducts: [
        ...state.panierProducts,
        action.product
      ]
    });
  }

  @Action(RemoveProductPanierAction)
  removeProductPanierAction(context: StateContext<IProductState>, action: IRemoveProductPanierAction) {
    const state = context.getState();
    context.setState({
      ...state,
      panierProducts: [
        ...state.panierProducts.filter(prod => prod.id !== action.product.id),
      ]
    });
  }
}
