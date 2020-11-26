import { Component, OnInit } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { ProductsService } from '@core/services/products/products.service';
import { Store } from '@core/models/store.model';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: Store[] = [];
  numberStoreFetch = 5;
  stateSeeMore = 0;
  stateBtnPage = 1;
  btnPageOne = 1;
  btnPageTwo = 2;
  btnPageThree = 3;
  stateBtnOne = true;
  stateBtnTwo = false;
  stateBtnThree = false;

  constructor(
    private storesService: StoresService,
    private windowService: WindowService,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.fetchStores();
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

  fetchStores() {
    this.windowService.loadingTrue();
    this.storesService.getAllStoresWithProduct(0)
    .subscribe((stores: any) => {
      console.log(stores);
      this.stores = stores;
      this.windowService.loadingFalse();
    });
  }

  seeMore() {
    this.stateSeeMore += 5;
    this.windowService.loadingTrue();
    this.storesService.getAllStoresWithProduct(this.stateSeeMore)
    .subscribe((stores: any) => {
      console.log(stores);
      this.windowService.loadingFalse();
      if (stores === undefined) {
        return;
      }
      this.stores = this.stores.concat(stores);
    });
  }

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
      this.stateSeeMore = this.numberStoreFetch * (this.btnPageOne - 1);
    }
    this.windowService.loadingTrue();
    this.storesService.getAllStoresWithProduct(this.stateSeeMore)
    .subscribe((stores: any) => {
      console.log(stores);
      this.windowService.loadingFalse();
      if (stores === undefined) {
        return;
      }
      this.stores = stores;
    });
    this.stateBtnPage = this.btnPageOne;
    this.changeStatePage();
  }

  btnTwo() {
    this.stateSeeMore = this.numberStoreFetch * (this.btnPageTwo - 1);
    this.windowService.loadingTrue();
    this.storesService.getAllStoresWithProduct(this.stateSeeMore)
    .subscribe((stores: any) => {
      console.log(stores);
      this.windowService.loadingFalse();
      if (stores === undefined) {
        return;
      }
      this.stores = stores;
    });
    this.stateBtnPage = this.btnPageTwo;
    this.changeStatePage();
  }

  btnThree() {
    this.stateSeeMore = this.numberStoreFetch * (this.btnPageThree - 1);
    this.windowService.loadingTrue();
    this.storesService.getAllStoresWithProduct(this.stateSeeMore)
    .subscribe((stores: any) => {
      console.log(stores);
      this.windowService.loadingFalse();
      if (stores === undefined) {
        return;
      }
      this.stores = stores;
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

}
