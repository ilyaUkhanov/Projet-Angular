export interface IFilterProductsAction {
  filterName: string;
  filterPrice: number;
}

export class FilterProductsAction {
  static readonly type = '[Product] Filter';
  constructor(public filterName: string, public filterPrice: number) {}
}
