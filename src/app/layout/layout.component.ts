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
  displayFooter = true;

  constructor(
    private cartService: CartService,
    private windowService: WindowService,
  ) {
    this.sideBarOpen$ = this.cartService.openSideBar$;
    this.sideBarOpenIzq$ = this.cartService.openSideBarIzq$;
    this.windowService.stateFooterTrue();
  }

  ngOnInit(): void {
    this.windowService.stateDisplayFooter$.subscribe(state => {
      this.displayFooter = state;
    });
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }
}
