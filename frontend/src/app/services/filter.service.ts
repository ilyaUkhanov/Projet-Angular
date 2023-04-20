import { Injectable } from '@angular/core';
import {IProduct} from "../types/products";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterName: string = "";
  public filterPrice: number = 0;
  constructor() {}

  public setFilters = (filterName: string, filterPrice: number) => {
    this.filterName = filterName;
    this.filterPrice = filterPrice;
  }

  public filter = (products: IProduct[]) => {

  }
}
