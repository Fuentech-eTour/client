import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products/products.service';
import { CartService } from '@core/services/cart.service';
import { WindowService } from '@core/services/window.service';
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
  displayFooter$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private windowService: WindowService,
  ) {
    this.sideBarOpen$ = this.cartService.openSideBar$;
    this.sideBarOpenIzq$ = this.cartService.openSideBarIzq$;
    this.displayFooter$ = this.windowService.stateDisplayFooter$;
  }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }
}
