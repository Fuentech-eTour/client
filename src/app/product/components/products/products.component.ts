import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from '@core/models/product.model';
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
export class ProductsComponent implements OnInit, AfterViewInit {

  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  store$: Observable<Store[]>;
  sideBarOpen$: Observable<boolean>;
  sideBarOpenIzq$: Observable<boolean>;
  products: Product[] = [];
  mySwiper: Swiper;
  showFiller = false;
  slidesPerView: number;
  windowWidth: number = window.screen.width;
  nameBanner = 'Descuentos';
  panelOpenState = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private windowService: WindowService,
  ) {
    this.products$ = this.cartService.cart$;
    this.totalCompra$ = this.cartService.precioTotal$;
    this.sideBarOpen$ = this.cartService.openSideBar$;
    this.sideBarOpenIzq$ = this.cartService.openSideBarIzq$;
    this.store$ = this.cartService.order$;
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit() {
    /* if (this.window$.subscribe() as any <= 425) {
      this.slidesPerView = 2;
    } else if (this.window$.subscribe() as any <= 768) {
      this.slidesPerView = 3;
    } else {
      this.slidesPerView = 6;
    } */

    if (window.matchMedia('(max-width: 375px)').matches) {
      this.slidesPerView = 2;
    } else if (window.matchMedia('(max-width: 516px)').matches) {
      this.slidesPerView = 3;
    } else if (window.matchMedia('(max-width: 668px)').matches) {
      this.slidesPerView = 4;
    } else if (window.matchMedia('(max-width: 860px)').matches) {
      this.slidesPerView = 5;
    } else {
      this.slidesPerView = 6;
    }

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: this.slidesPerView, // para movil 2, para tablet 3, para portatil 6
      spaceBetween: 15,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  fetchProducts() {
    this.windowService.loadingTrue();
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.products = products;
      this.windowService.loadingFalse();
    });
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }

  toggleSideBarIzq() {
    this.cartService.sideBarTogglerIzq();
  }
}
