import { Component } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {IProductState, ProductState} from "../../state/product.state";
import {IProduct} from "../../types/products";
import {ActivatedRoute} from "@angular/router";
import {AddProductPanierAction} from "../../actions/addProductPanier.actions";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  public product: IProduct | null | undefined = null;
  @Select(ProductState) productsState!: Observable<IProductState>;

  public constructor(private route: ActivatedRoute,
                     private store: Store) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsState.subscribe((store) => {
      this.product = store.products.find(prod => prod.id == id);
    })
  }

  submitAddPanierProduct(product: IProduct) {
    if (!product) return;
    this.store.dispatch(new AddProductPanierAction(product))
  }
}
