import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WindowService } from '@core/services/window.service';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  private isloading = new BehaviorSubject<boolean>(false);
  isloading$ = this.isloading.asObservable();
  matBageShow$: Observable<boolean>;
  nameUser$: Observable<string>;
  stateOrders = [];
  stateOrder = new BehaviorSubject<any[]>([]);
  stateOrder$ = this.stateOrder.asObservable();
  numNewOrders = new BehaviorSubject<number>(0);
  numNewOrders$ = this.numNewOrders.asObservable();
  stateNumOrder = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private windowService: WindowService,
    private authService: AuthService,
    private orderService: OrderService,
    ) {
      this.nameUser$ = windowService.userName$;
      if (localStorage.getItem('stateNotifications')) {
        this.numNewOrders.next(parseInt(localStorage.getItem('stateNotifications'), 10));
      }
      if (localStorage.getItem('stateOrders')) {
        this.stateOrder.next(JSON.parse(localStorage.getItem('stateOrders')));
      }
    }

    ngOnInit() {
      this.orderService.stateOrder$()
        .subscribe((data: any) => {
          console.log(data);
          this.stateNumOrder += 1;
          localStorage.setItem('stateNotifications', this.stateNumOrder.toString());
          this.numNewOrders.next(this.stateNumOrder);
          this.stateOrders.push(data);
          localStorage.setItem('stateOrders', JSON.stringify(this.stateOrders));
          this.stateOrder.next(this.stateOrders);
        });
      this.matBageShow$ = this.numNewOrders$
        .pipe(map(num => {if (num > 0) {
          return false;
        } else {
          return true;
        }}));
    }

    resetNotifications() {
      this.numNewOrders.next(0);
      localStorage.setItem('stateNotifications', '0');
    }

    logout() {
      this.windowService.addUserName(null);
      this.authService.logout();
    }

}
