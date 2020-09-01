import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { WindowService } from '@core/services/window.service';
import { Observable } from 'rxjs';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  displayFooter$: Observable<any>;
  displayHeader$: Observable<any>;
  windowWidth: number = window.screen.width;

  constructor(
    private router: Router,
    private cartService: CartService,
    private windowService: WindowService,
  ) {
    this.displayFooter$ = this.windowService.stateDisplayFooter$;
    this.displayHeader$ = this.windowService.stateDisplayHeader$;
  }

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.windowService.stateFooterTrue();
    }
  }

  ngOnDestroy() {
    this.windowService.stateFooterFalse();
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }
}
