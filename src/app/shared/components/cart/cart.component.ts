import { Component, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { AddProduct } from '@core/models/addProduct.model';
import { Store } from '@core/models/store.model';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  store$: Observable<Store[]>;
  sideBarOpen$: Observable<boolean>;
  sideBarOpenIzq$: Observable<boolean>;
  showFiller = false;
  slidesPerView: number;
  panelOpenState = false;

  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;
    this.totalCompra$ = this.cartService.precioTotal$;
    this.sideBarOpen$ = this.cartService.openSideBar$;
    this.sideBarOpenIzq$ = this.cartService.openSideBarIzq$;
    this.store$ = this.cartService.order$;
  }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }

  toggleSideBarIzq() {
    this.cartService.sideBarTogglerIzq();
  }

}
