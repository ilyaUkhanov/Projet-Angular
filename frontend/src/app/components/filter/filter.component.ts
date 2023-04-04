import { Component, OnInit,ViewChild  } from '@angular/core';
import {ListProductComponent} from '../list-product/list-product.component'
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @ViewChild(ListProductComponent) ListProduct: ListProductComponent | undefined;
  constructor(private filterService: FilterService) { }
  nameFilterText:string = "";
  priceFilterText:number | undefined;
  ngOnInit(): void {
  }

  onInputChangeTitre(value:any) {
    this.filterService.filterName = value;
    this.ListProduct?.filter();
  }

  onInputChangePrice(value:any) {
    this.filterService.filterPrice = value;
    this.ListProduct?.filter();
  }

}
