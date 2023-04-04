export type IProduct = {
  id: number | null;
  title: string;
  price: number;
}

export type IProductFromServer = {
  id: number | null;
  value: string;
  title: string;
  price: string;
}
