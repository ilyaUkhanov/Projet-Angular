import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ProductsRepositoryService} from "../services/products-repository.service";
import {AddProductAction, IAddProductAction} from "../actions/addProduct.actions";
import {IProduct} from "../types/products";
import {IRemoveProductAction, RemoveProductAction} from "../actions/removeProduct.actions";
import {AddProductPanierAction, IAddProductPanierAction} from "../actions/addProductPanier.actions";
import {IRemoveProductPanierAction, RemoveProductPanierAction} from "../actions/removeProductPanier.actions";
import {FilterProductsAction, IFilterProductsAction} from "../actions/filterProducts.actions";
import {ILoadProductsAction, LoadProductAction} from "../actions/loadProducts.actions";

export type IProductState = {
  products: IProduct[];
  panierProducts: IProduct[];
  filteredProducts: IProduct[];
};

@State<IProductState>({
  name: 'products',
  defaults: { products: [], panierProducts: [], filteredProducts: [] }
})
@Injectable()
export class ProductState {
  constructor(private productsRepositoryService: ProductsRepositoryService) {}

  private previousFilterName: string|null = null;
  private previousFilterPrice: number|null = null;

  private filterProductsMapper = (products: IProduct[], filterName: string, filterPrice: number) => {
    return products.filter(product =>
      (product.price <= filterPrice || filterPrice === 0 || isNaN(filterPrice)) &&
      (product.title.toLowerCase().includes(filterName.toLowerCase()) || filterName === "")
    )
  }

  // PRODUITS
  @Action(AddProductAction)
  addProduct(context: StateContext<IProductState>, action: IAddProductAction) {
    const state = context.getState();
    const newProducts = [
      ...state.products,
      action.product
    ];

    context.setState({
      ...state,
      products: newProducts,
      filteredProducts: this.filterProductsMapper(newProducts, this.previousFilterName ?? "", this.previousFilterPrice ?? 0)
    });
  }

  @Action(LoadProductAction)
  loadProducts(context: StateContext<IProductState>, action: ILoadProductsAction) {
    const state = context.getState();
    context.setState({
      ...state,
      products: action.products,
      filteredProducts: this.filterProductsMapper(action.products, this.previousFilterName ?? "", this.previousFilterPrice ?? 0)
    });
  }

  @Action(RemoveProductAction)
  removeProduct(context: StateContext<IProductState>, action: IRemoveProductAction) {
    const state = context.getState();
    const newProducts = state.products.filter(prod => prod.id !== action.product.id);

    context.setState({
      ...state,
      products: newProducts,
      filteredProducts: this.filterProductsMapper(newProducts, this.previousFilterName ?? "", this.previousFilterPrice ?? 0)
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
      ],
      filteredProducts: this.filterProductsMapper(state.panierProducts, this.previousFilterName ?? "", this.previousFilterPrice ?? 0)
    });
  }

  @Action(FilterProductsAction)
  filterProducts(context: StateContext<IProductState>, action: IFilterProductsAction) {
    const state = context.getState();
    this.previousFilterName = action.filterName;
    this.previousFilterPrice = action.filterPrice;

    context.setState({
      ...state,
      filteredProducts: this.filterProductsMapper(state.products, action.filterName, action.filterPrice)
    });
  }

  @Selector()
  static getProducts(state: IProductState): IProduct[] {
    return state.products;
  }
}
