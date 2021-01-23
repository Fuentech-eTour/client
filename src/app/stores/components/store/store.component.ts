import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { ProductsService } from '@core/services/products/products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  store$: Observable<any>;
  storeForSidenav$: Observable<any>;
  tagsStore$: Observable<any>;
  productCategories = new BehaviorSubject<[]>([]);
  productCategories$ = this.productCategories.asObservable();
  tags: any;
  idStore: number;
  idTag: number;
  nameStore: string;
  imagent: string;
  products$: Observable<any>;
  hiddenPagination = true;
  viewAllProducts = true;
  activeLink = 1;

  // pagination for the searched products
  numberProductsFetch = 20;
  stateSeeMoreProducts = 0;
  stateBtnPage = 1;
  btnPageOne = 1;
  btnPageTwo = 2;
  btnPageThree = 3;
  stateBtnOne = true;
  stateBtnTwo = false;
  stateBtnThree = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private productsService: ProductsService
  ) {
    this.windowService.stateFooterFalse();
  }

  ngOnInit(): void {
    this.fetchProductsOneStore();
    this.infoSession();
  }

  fetchProductsOneStore() {
    this.windowService.loadingTrue();
    this.viewAllProducts = true;
    this.store$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.storesService.getProductsOneStore(
          params.id, 
          this.stateSeeMoreProducts
        );
      })
    );
    this.storeForSidenav$ = this.store$;
    this.store$.subscribe((store: any[]) => {
      this.idStore = store[0].id;
      this.nameStore = store[0].razonsocial;
      this.imagent = store[0].imagen;
      if (store[0].products.length < 20) {
        this.hiddenPagination = false;
      }
      this.windowService.loadingFalse();
      this.fetchTagsOneStore();
    });
  }

  fetchTagsOneStore() {
    this.tagsStore$ = this.storesService.getTagsOneStore(this.idStore);
    this.tagsStore$.subscribe((store: any) => {
      this.productCategories.next(store[0].tags);
    });
    this.productCategories$.subscribe(tags => {
      this.tags = tags;
      console.log(tags);
    });
  }

  fetchProductsForIdTag(tag) {
    this.idTag = tag.id;
    this.activeLink = tag.id;
    this.windowService.loadingTrue();
    this.stateInitialPagination();
    this.viewAllProducts = false;
    this.hiddenPagination = true;
    this.products$ = this.productsService.getProductsByIdStoreAndIdTag(
      this.idStore, 
      this.idTag, 
      this.stateSeeMoreProducts
    )
    this.products$.subscribe((products: any) => {
      this.windowService.loadingFalse();
      if (products.length < 20) {
        this.hiddenPagination = false;
      }
    });
  }

  stateInitialPagination() {
    this.stateSeeMoreProducts = 0;
    this.stateBtnPage = 1;
    this.btnPageOne = 1;
    this.btnPageTwo = 2;
    this.btnPageThree = 3;
    this.stateBtnOne = true;
    this.stateBtnTwo = false;
    this.stateBtnThree = false;
  }

  infoSession() {
    this.windowService.session$.subscribe(state => {
      if (state === 'isClient') {
        this.storesService.getStoreFavorite().subscribe(data => {
          this.storesService.stateFavoriteStore(data);
        });
        this.productsService.getFavoriteProducts().subscribe(data => {
          this.productsService.stateFavoriteProducts(data);
        });
      }
    });
  }

  backHistory() {
    window.history.back();
  }

  ngOnDestroy() {
    this.windowService.stateFooterTrue();
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
      this.stateSeeMoreProducts = 0;
    }
    if (this.btnPageOne !== 1) {
      this.stateSeeMoreProducts = this.numberProductsFetch * (this.btnPageOne - 1);
    }
    this.fetchProductsNewPage();
    this.stateBtnPage = this.btnPageOne;
    this.changeStatePage();
  }

  btnTwo() {
    this.stateSeeMoreProducts = this.numberProductsFetch * (this.btnPageTwo - 1);
    this.fetchProductsNewPage();
    this.stateBtnPage = this.btnPageTwo;
    this.changeStatePage();
  }

  btnThree() {
    this.stateSeeMoreProducts = this.numberProductsFetch * (this.btnPageThree - 1);
    this.fetchProductsNewPage();
    this.stateBtnPage = this.btnPageThree;
    this.changeStatePage();
  }

  fetchProductsNewPage() {
    this.windowService.loadingTrue();
    if (this.viewAllProducts) {
      this.store$ = this.storesService.getProductsOneStore(this.idStore, this.stateSeeMoreProducts);
    } else {
      this.products$ = this.productsService.getProductsByIdStoreAndIdTag(
        this.idStore, 
        this.idTag, 
        this.stateSeeMoreProducts
      );
    }
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

}
