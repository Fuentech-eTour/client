import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';
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
  userName: string;
  idStore: string;
  isLoading$: Observable<boolean>;
  matBageShow$: Observable<boolean>;
  private order = new BehaviorSubject<any[]>([]);
  order$ = this.order.asObservable();
  stateOrder = [];
  stateNumOrder = 0;
  numNewOrders = new BehaviorSubject<number>(0);
  numNewOrders$ = this.numNewOrders.asObservable();
  private pendingOrder = new BehaviorSubject<any[]>([]);
  pendingOrder$ = this.pendingOrder.asObservable();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private windowService: WindowService,
    private orderService: OrderService,
    ) {
      this.userName = this.authService.getUserName();
      this.isLoading$ = this.windowService.isloading$;
      this.idStore = this.authService.getIdStore();
      if (localStorage.getItem('newOrders')) {
        this.order.next(JSON.parse(localStorage.getItem('newOrders')));
      }
      if (localStorage.getItem('stateNotifications')) {
        this.numNewOrders.next(parseInt(localStorage.getItem('stateNotifications'), 10));
      }
    }

    ngOnInit(): void {
      this.authService.refreshToken().subscribe((res: any) => {
        if (res.status === 'UPDATED') {
          this.orderService.joinUser();
        }
      });
      this.orderService.newOrders$()
        .subscribe((data: any) => {
          console.log(data);
          this.stateNumOrder += 1;
          localStorage.setItem('stateNotifications', this.stateNumOrder.toString());
          this.numNewOrders.next(this.stateNumOrder);
          this.stateOrder.push(data);
          localStorage.setItem('newOrders', JSON.stringify(this.stateOrder));
          this.order.next(this.stateOrder);
        });
      this.matBageShow$ = this.numNewOrders$
        .pipe(map(num => {if (num > 0) {
          return false;
        } else {
          return true;
        }}));
    }

    fetchPendingOrder() {
      // Reinicia las notificaciones
      this.numNewOrders.next(0);
      localStorage.setItem('stateNotifications', '0');

      // Toma el dato actualizado de las notificacines en el localstorage
      if (localStorage.getItem('newOrders')) {
        this.order.next(JSON.parse(localStorage.getItem('newOrders')));
      }

      this.orderService.getShoppingByOneStore()
        .subscribe((data: any) => {
          if (data.status === 402) {
            return;
          }
          console.log(data);
          this.pendingOrder.next(data);
      });
    }

    logout() {
      this.authService.logout();
    }

}
