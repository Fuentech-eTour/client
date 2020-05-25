import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products/products.service';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sideBarOpen$: Observable<boolean>;
  sideBarOpenIzq$: Observable<boolean>;
  windowWidth: number = window.screen.width;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {
    this.sideBarOpen$ = this.cartService.openSideBar$;
    this.sideBarOpenIzq$ = this.cartService.openSideBarIzq$;
  }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }
}
