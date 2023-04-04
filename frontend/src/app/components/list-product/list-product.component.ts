import { Component, Input, OnInit  } from '@angular/core';
import {ProductsRepositoryService} from '../../services/products-repository.service'
import {FilterService} from "../../services/filter.service";
import {IProduct, IProductFromServer} from "../../types/products";
import {Select, Store} from "@ngxs/store";
import {CONVERTER_PRODUCTS} from "../../converters/products-converter";
import {AddProductAction} from "../../actions/addProduct.actions";
import {IProductState, ProductState} from "../../state/product.state";
import {Observable, withLatestFrom} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RemoveProductAction} from "../../actions/removeProduct.actions";
import {AddProductPanierAction} from "../../actions/addProductPanier.actions";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  @Select(ProductState) productState!: Observable<IProductState>;
  filteredProducts: IProduct[] = [];

  nextID: number = 0;

  public ProductFormIdentification!: FormGroup;

  isLoadingProducts: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private httpService: ProductsRepositoryService,
              private filterService: FilterService,
              private store: Store) {}

  ngOnInit() {
    this.ProductFormIdentification = this.formBuilder.group({
      label: ['',Validators.required],
      price: ['',Validators.required]
    });

    this.isLoadingProducts = true;
    this.httpService.getData().then((productsFromServer: Observable<IProductFromServer[]>) => {
      productsFromServer
        .pipe()
        .subscribe((products) => {
          const convertedProducts = products.map(prod => CONVERTER_PRODUCTS.serverToApp(prod));
          convertedProducts.map((product) => {
            this.store.dispatch(new AddProductAction(product));
          })

          this.filteredProducts = this.getFilteredProducts(convertedProducts);
        });

    }).then(()=>{
      this.isLoadingProducts = false;
    })


    this.productState.subscribe((productState) => {
      // Trouver nextID
      let biggestID = 0;
      productState.products.map(prod => {
        if (biggestID < (prod?.id ?? 0)) biggestID = prod?.id ?? 0;
        return prod;
      })

      this.nextID = biggestID + 1;

      // Assigner les products
      this.filteredProducts = this.getFilteredProducts(productState.products);
    });
  }

  submitAddProduct() {
    const product = {
      id: this.nextID,
      title: this.ProductFormIdentification.get('label')?.value ?? "",
      price: this.ProductFormIdentification.get('price')?.value ?? 0,
    };
    this.addProduct(product);
  }
  submitRemoveProduct(product: IProduct) {
    this.store.dispatch(new RemoveProductAction(product))
  }

  submitAddPanierProduct(product: IProduct) {
    this.store.dispatch(new AddProductPanierAction(product))
  }

  addProduct(product: IProduct) {
    this.store.dispatch(new AddProductAction(product))
  }

  getFilteredProducts(products: IProduct[]) {
    return products.filter(product =>
      (product.price <= this.filterService.filterPrice || this.filterService.filterPrice === 0) &&
      (product.title.toLowerCase().includes(this.filterService.filterName.toLowerCase()) || this.filterService.filterName === "")
    )
  }

  filter() {

  }
}
