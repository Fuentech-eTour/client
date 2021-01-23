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
  searchParams: any;
  hiddenPaginationProducts = true;
  hiddenPaginationStores = true;

  // pagination for the searched products
  numberProductsFetch = 12;
  stateSeeMore = 0;
  stateBtnPage = 1;
  btnPageOne = 1;
  btnPageTwo = 2;
  btnPageThree = 3;
  stateBtnOne = true;
  stateBtnTwo = false;
  stateBtnThree = false;

  // paging for stores searched
  numberStoresFetch = 5;
  stateSeeMoreStore = 0;
  stateBtnPageStore = 1;
  btnPageOneStore = 1;
  btnPageTwoStore = 2;
  btnPageThreeStore = 3;
  stateBtnOneStore = true;
  stateBtnTwoStore = false;
  stateBtnThreeStore = false;

  constructor(
    private storesService: StoresService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private windowService: WindowService,
  ) {
    this.windowService.loadingTrue();
    this.stores = [];
    this.products = [];
    this.messageStores = false;
    this.messageProducts = false;
   }

  ngOnInit(): void {
    this.fetchProductSearchByName();
    this.fetchStoreSearchByName();
    this.assignSearchSettingsForProducts();
    this.assignSearchSettingsForStores();
    /* this.windowService.windowWidth$.subscribe(width => {
      if (width < 600) {
        this.windowService.stateHeaderTrue();
      }
    }); */
  }

  ngOnDestroy() {
    this.windowService.stateHeaderFalse();
  }

  fetchProductSearchByName() {
    this.stateSearchProducts$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.productsService.getProductByName(params.name, this.stateSeeMore);
      })
    );
  }

  fetchStoreSearchByName() {
    this.stateSearchStores$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        this.searchParams = params.name;
        return this.storesService.getStoreByName(params.name, this.stateSeeMoreStore);
      })
    );
  }

  assignSearchSettingsForProducts() {
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
        if (state.length < 5) {
          this.hiddenPaginationProducts = false;
        }
      }
    });
  }

  assignSearchSettingsForStores() {
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
        if (state.length < 5) {
          this.hiddenPaginationStores = false;
        }
      }
    });
  }
 
  // pagination for the searched products --init--

  paginationNext() {
    this.btnPageOne += 1;
    this.btnPageTwo += 1;
    this.btnPageThree += 1;
    this.changeStatePage();
  }

  paginationPrevious() {
    this.changeStatePage();
    if (this.btnPageOne === 1) {
      return;
    }
    this.btnPageOne -= 1;
    this.btnPageTwo -= 1;
    this.btnPageThree -= 1;
    this.changeStatePage();
  }

  btnOne() {
    if (this.btnPageOne === 1) {
      this.stateSeeMore = 0;
    }
    if (this.btnPageOne !== 1) {
      this.stateSeeMore = this.numberProductsFetch * (this.btnPageOne - 1);
    }
    this.windowService.loadingTrue();
    this.productsService.getProductByName(this.searchParams, this.stateSeeMore)
    .subscribe((products: any) => {
      this.windowService.loadingFalse();
      if (products.status === '402') {
        this.products = [];
        return;
      }
      this.products = products;
    });
    this.stateBtnPage = this.btnPageOne;
    this.changeStatePage();
  }

  btnTwo() {
    this.stateSeeMore = this.numberProductsFetch * (this.btnPageTwo - 1);
    this.windowService.loadingTrue();
    this.productsService.getProductByName(this.searchParams, this.stateSeeMore)
    .subscribe((products: any) => {
      this.windowService.loadingFalse();
      if (products.status === '402') {
        this.products = [];
        return;
      }
      this.products = products;
    });
    this.stateBtnPage = this.btnPageTwo;
    this.changeStatePage();
  }

  btnThree() {
    this.stateSeeMore = this.numberProductsFetch * (this.btnPageThree - 1);
    this.windowService.loadingTrue();
    this.productsService.getProductByName(this.searchParams, this.stateSeeMore)
    .subscribe((products: any) => {
      this.windowService.loadingFalse();
      if (products.status === '402') {
        this.products = [];
        return;
      }
      this.products = products;
    });
    this.stateBtnPage = this.btnPageThree;
    this.changeStatePage();
  }

  changeStatePage() {
    if (this.stateBtnPage === this.btnPageOne) {
      this.stateBtnOne = true;
      this.stateBtnTwo = false;
      this.stateBtnThree = false;
    }

    if (this.stateBtnPage === this.btnPageTwo) {
      this.stateBtnOne = false;
      this.stateBtnTwo = true;
      this.stateBtnThree = false;
    }

    if (this.stateBtnPage === this.btnPageThree) {
      this.stateBtnOne = false;
      this.stateBtnTwo = false;
      this.stateBtnThree = true;
    }

    if (this.stateBtnPage !== this.btnPageOne &&
      this.stateBtnPage !== this.btnPageTwo &&
      this.stateBtnPage !== this.btnPageThree) {
        this.stateBtnOne = false;
        this.stateBtnTwo = false;
        this.stateBtnThree = false;
    }
  }

  // pagination for the searched products --final--

  // paging for stores searched --init--

  paginationNextStores() {
    this.btnPageOneStore += 1;
    this.btnPageTwoStore += 1;
    this.btnPageThreeStore += 1;
    this.changeStatePageStores();
  }

  paginationPreviousStores() {
    this.changeStatePageStores();
    if (this.btnPageOneStore === 1) {
      return;
    }
    this.btnPageOneStore -= 1;
    this.btnPageTwoStore -= 1;
    this.btnPageThreeStore -= 1;
    this.changeStatePageStores();
  }

  btnOneStores() {
    if (this.btnPageOneStore === 1) {
      this.stateSeeMoreStore = 0;
    }
    if (this.btnPageOneStore !== 1) {
      this.stateSeeMoreStore = this.numberStoresFetch * (this.btnPageOneStore - 1);
    }
    this.windowService.loadingTrue();
    this.storesService.getStoreByName(this.searchParams, this.stateSeeMoreStore)
    .subscribe((stores: any) => {
      this.windowService.loadingFalse();
      if (stores.status === '402') {
        this.stores = [];
        return;
      }
      this.stores = stores;
    });
    this.stateBtnPage = this.btnPageOneStore;
    this.changeStatePageStores();
  }

  btnTwoStores() {
    this.stateSeeMoreStore = this.numberStoresFetch * (this.btnPageTwoStore - 1);
    this.windowService.loadingTrue();
    this.storesService.getStoreByName(this.searchParams, this.stateSeeMoreStore)
    .subscribe((stores: any) => {
      this.windowService.loadingFalse();
      if (stores.status === '402') {
        this.stores = [];
        return;
      }
      this.stores = stores;
    });
    this.stateBtnPage = this.btnPageTwoStore;
    this.changeStatePageStores();
  }

  btnThreeStores() {
    this.stateSeeMoreStore = this.numberStoresFetch * (this.btnPageThreeStore - 1);
    this.windowService.loadingTrue();
    this.storesService.getStoreByName(this.searchParams, this.stateSeeMoreStore)
    .subscribe((stores: any) => {
      this.windowService.loadingFalse();
      if (stores.status === '402') {
        this.stores = [];
        return;
      }
      this.stores = stores;
    });
    this.stateBtnPage = this.btnPageThreeStore;
    this.changeStatePageStores();
  }

  changeStatePageStores() {
    if (this.stateBtnPage === this.btnPageOneStore) {
      this.stateBtnOneStore = true;
      this.stateBtnTwoStore = false;
      this.stateBtnThreeStore = false;
    }

    if (this.stateBtnPage === this.btnPageTwoStore) {
      this.stateBtnOneStore = false;
      this.stateBtnTwoStore = true;
      this.stateBtnThreeStore = false;
    }

    if (this.stateBtnPage === this.btnPageThreeStore) {
      this.stateBtnOneStore = false;
      this.stateBtnTwoStore = false;
      this.stateBtnThreeStore = true;
    }

    if (this.stateBtnPage !== this.btnPageOneStore &&
      this.stateBtnPage !== this.btnPageTwoStore &&
      this.stateBtnPage !== this.btnPageThreeStore) {
        this.stateBtnOneStore = false;
        this.stateBtnTwoStore = false;
        this.stateBtnThreeStore = false;
    }
  }

  // paging for stores searched --final--

}
