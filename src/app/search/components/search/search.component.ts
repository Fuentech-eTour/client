import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StoresService } from '@core/services/stores.service';
import { ProductsService } from '@core/services/products/products.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  stores: [];
  products: [];
  messageStores: boolean;
  messageProducts: boolean;
  stateSearchStores$: Observable<any>;
  stateSearchProducts$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private storesService: StoresService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private windowService: WindowService,
  ) {
    this.windowService.loadingTrue();
    this.stateSearchStores$ = this.route.params
          .pipe(
            switchMap((params: Params) => {
              return this.storesService.getStoreByName(params.name);
            })
          );
    this.stateSearchProducts$ = this.route.params
          .pipe(
            switchMap((params: Params) => {
              return this.productsService.getProductByName(params.name);
            })
          );
    this.stores = [];
    this.products = [];
    this.messageStores = false;
    this.messageProducts = false;
   }

  ngOnInit(): void {
    this.stateSearchStores$.subscribe((state: any) => {
      if (state.status === '402') {
        this.messageStores = true;
        this.stores = [];
        this.windowService.loadingFalse();
      } else {
        this.messageStores = false;
        if (state.length !== 0 || this.isLoading$) {
          this.stores = state;
          this.windowService.loadingFalse();
        }
      }
    });

    this.stateSearchProducts$.subscribe((state: any) => {
      if (state.status === '402') {
        this.messageProducts = true;
        this.products = [];
        this.windowService.loadingFalse();
      } else {
        this.messageProducts = false;
        if (state.length !== 0 || this.isLoading$) {
          this.products = state;
          this.windowService.loadingFalse();
        }
      }
    });
    this.windowService.stateHeaderTrue();
  }

  ngOnDestroy() {
    this.windowService.stateHeaderFalse();
  }

}
