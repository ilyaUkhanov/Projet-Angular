import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListProductComponent} from '../list-product/list-product.component'
import {FilterService} from "../../services/filter.service";
import {debounceTime, distinctUntilChanged, Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {IProductState, ProductState} from "../../state/product.state";
import {FilterProductsAction} from "../../actions/filterProducts.actions";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  model: Observable<any> | null = null;

  @ViewChild('priceFilter', { static: true }) inputPrice: ElementRef | null = null;
  searchFieldPrice$: Observable<any> | null = null;

  @ViewChild('nameFilter', { static: true }) inputName: ElementRef | null = null;
  searchFieldName$: Observable<any> | null = null;

  @Select(ProductState) productsState!: Observable<IProductState>;

  @ViewChild(ListProductComponent) ListProduct: ListProductComponent | undefined;
  constructor(private filterService: FilterService, private store: Store) {

  }
  nameFilterText:string = "";
  priceFilterText:number | undefined;

  private searchName$ = new Subject<string>();
  private searchPrice$ = new Subject<string>();
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.searchName$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterService.filterName = value;
      this.store.dispatch(new FilterProductsAction(this.filterService.filterName, this.filterService.filterPrice));
    });

    this.searchPrice$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(price => {
      this.filterService.filterPrice = parseInt(price);
      this.store.dispatch(new FilterProductsAction(this.filterService.filterName, this.filterService.filterPrice));
    });
  }

  searchName(event: KeyboardEvent) {
    // @ts-ignore
    this.searchName$.next(event.target?.value ?? "");
  }

  searchPrice(event: KeyboardEvent) {
    // @ts-ignore
    this.searchPrice$.next(event.target?.value ?? "");
  }
}
