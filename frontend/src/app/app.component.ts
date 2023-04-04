import { Component } from '@angular/core';
import {ProductsRepositoryService} from './services/products-repository.service'
import {Select} from "@ngxs/store";
import {IProductState, ProductState} from "./state/product.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(ProductState) panierProducts!: Observable<IProductState>;
  public numberPanierProducts: number = 0;

  ngOnInit() {
    this.panierProducts.subscribe((store) => {
      this.numberPanierProducts = store.panierProducts.length;
    })
  }
}
