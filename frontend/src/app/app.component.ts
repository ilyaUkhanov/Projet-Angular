import { Component } from '@angular/core';
import {Select} from "@ngxs/store";
import {IProductState, ProductState} from "./state/product.state";
import {Observable} from "rxjs";
import {RouterModule} from '@angular/router';
import {IUserState, UserState} from "./state/user.state";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(ProductState) panierProducts!: Observable<IProductState>;
  @Select(UserState) userState!: Observable<IUserState>;

  public numberPanierProducts: number = 0;

  public connected: Boolean = false;

  public constructor() {
    this.userState.subscribe((user) => {
      this.connected = user?.isConnected ?? false;
      console.log("connected", user?.isConnected ?? false);
    })
  }

  ngOnInit() {
    this.panierProducts.subscribe((store) => {
      this.numberPanierProducts = store.panierProducts.length;
    })
  }
}
