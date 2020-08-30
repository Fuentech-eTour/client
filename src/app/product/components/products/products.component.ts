import { Component, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';
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
  tags: any;
  mySwiper: Swiper;
  showFiller = false;
  slidesPerView: number;
  windowWidth: number = window.screen.width;
  panelOpenState = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private windowService: WindowService,
    private authService: AuthService,
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
    this.productsService.getAllProductsByTags()
    .subscribe(tags => {
      this.tags = tags;
      this.windowService.loadingFalse();
    });
  }
}
