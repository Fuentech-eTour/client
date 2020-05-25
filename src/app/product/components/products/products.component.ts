import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductsService } from '@core/services/products/products.service';
import { AddProduct } from '@core/models/addProduct.model';
import { Store } from '@core/models/store.model';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';

import Swiper from 'swiper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  products: Product[] = [];
  mySwiper: Swiper;
  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  store$: Observable<Store[]>;
  sideBarOpen$: Observable<boolean>;
  sideBarOpenIzq$: Observable<boolean>;
  showFiller = false;
  slidesPerView: number;
  windowWidth: number = window.screen.width;
  nameBanner = 'Descuentos';
  panelOpenState = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
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
    if (window.screen.width <= 425) {
      this.slidesPerView = 2;
    } else if (window.screen.width <= 768) {
      this.slidesPerView = 3;
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
      /* pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }, */
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  fetchProducts() {
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }

  toggleSideBarIzq() {
    this.cartService.sideBarTogglerIzq();
  }
}