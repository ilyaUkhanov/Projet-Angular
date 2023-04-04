import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { FilterComponent } from './components/filter/filter.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import {NgxsModule, Select} from "@ngxs/store";
import {IProductState, ProductState} from "./state/product.state";
import {environment} from "../environments/environment";
import {PanierComponent} from "./components/panier/panier.component";
import {DetailComponent} from "./components/detail/detail.component";
import {RouterModule, Routes} from "@angular/router";
import {ConnectionComponent} from "./components/connection/connection.component";

const appRoutes: Routes = [
  {path: '', component: FilterComponent},
  { path: 'product/details/:id', component: DetailComponent },
  { path: 'product', component: ListProductComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'connection', component: ConnectionComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    FilterComponent,
    FormComponent,
    PanierComponent,
    DetailComponent,
    ConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ProductState], { developmentMode: !environment.production }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
