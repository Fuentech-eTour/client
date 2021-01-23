import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products/products.service';
import { AddProduct } from '@core/models/addProduct.model';
import { Store } from '@core/models/store.model';
import { CartService } from '@core/services/cart.service';
import { WindowService } from '@core/services/window.service';
import { Observable } from 'rxjs';

import Swiper from 'swiper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  store$: Observable<Store[]>;
  products: [];
  mySwiper: Swiper;
  showFiller = false;
  slidesPerView: number;
  windowWidth: number = window.screen.width;
  panelOpenState = false;
  searchParams: any;

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
    private cartService: CartService,
    private productsService: ProductsService,
    private windowService: WindowService,
  ) {
    this.products$ = this.cartService.cart$;
    this.totalCompra$ = this.cartService.precioTotal$;
    this.store$ = this.cartService.order$;
    this.windowService.stateFooterFalse();
  }

  ngOnInit(): void {
    this.fetchProductsByTags();
    this.fetchFavoriteProducts();
  }

  fetchFavoriteProducts() {
    this.windowService.session$.subscribe(rol => {
      if (rol === 'isClient') {
        this.productsService.getFavoriteProducts().subscribe(data => {
          this.productsService.stateFavoriteProducts(data);
        });
      }
    });
  }

  fetchProductsByTags() {
    this.windowService.loadingTrue();
    this.productsService.getAllProducts(this.stateSeeMoreProducts)
    .subscribe((products: []) => {
      this.products = products;
      this.windowService.loadingFalse();
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
      this.stateSeeMoreProducts = 0;
    }
    if (this.btnPageOne !== 1) {
      this.stateSeeMoreProducts = this.numberProductsFetch * (this.btnPageOne - 1);
    }

    this.windowService.loadingTrue();
    this.productsService.getAllProducts(this.stateSeeMoreProducts)
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
    this.stateSeeMoreProducts = this.numberProductsFetch * (this.btnPageTwo - 1);
    this.windowService.loadingTrue();
    this.productsService.getAllProducts(this.stateSeeMoreProducts)
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
    this.stateSeeMoreProducts = this.numberProductsFetch * (this.btnPageThree - 1);
    this.windowService.loadingTrue();
    this.productsService.getAllProducts(this.stateSeeMoreProducts)
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
}
