import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '@core/services/order.service';
import { BehaviorSubject } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['Orden', 'Acciones'];
  stateOrder = [];
  private order = new BehaviorSubject<any[]>([]);
  order$ = this.order.asObservable();
  private isloading = new BehaviorSubject<boolean>(false);
  isloading$ = this.isloading.asObservable();
  private isloadingTwo = new BehaviorSubject<boolean>(false);
  isloadingTwo$ = this.isloadingTwo.asObservable();
  private isloadingThree = new BehaviorSubject<boolean>(false);
  isloadingThree$ = this.isloadingThree.asObservable();
  private isloadingFour = new BehaviorSubject<boolean>(false);
  isloadingFour$ = this.isloadingFour.asObservable();
  private isloadingFive = new BehaviorSubject<boolean>(false);
  isloadingFive$ = this.isloadingFive.asObservable();
  private pendingOrder = new BehaviorSubject<any[]>([]);
  pendingOrder$ = this.pendingOrder.asObservable();
  private WithoutDispatching = new BehaviorSubject<any[]>([]);
  WithoutDispatching$ = this.WithoutDispatching.asObservable();
  private dispatchedOrders = new BehaviorSubject<any[]>([]);
  dispatchedOrders$ = this.dispatchedOrders.asObservable();
  private canceledOrders = new BehaviorSubject<any[]>([]);
  canceledOrders$ = this.canceledOrders.asObservable();
  private historyOrder = new BehaviorSubject<any[]>([]);
  historyOrder$ = this.historyOrder.asObservable();

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
  ) {
   }

  ngOnInit(): void {
    this.orderService.newOrders$()
      .subscribe((order: any) => {
        console.log(order);
        this.order$.subscribe(data => {
          this.stateOrder = data;
        });
        this.stateOrder.push(order);
        this.order.next(this.stateOrder);
      });
    this.fetchPendingOrder();
    this.fetchWithoutDispatching();
    this.fetchDispatchedOrders();
    this.fetchCanceledOrders();
    this.fetchHistoryOrder();
  }

  update() {
    this.fetchPendingOrder();
    this.fetchWithoutDispatching();
    this.fetchDispatchedOrders();
    this.fetchCanceledOrders();
    this.fetchHistoryOrder();
  }

  fetchPendingOrder() {
    this.isloading.next(true);
    this.orderService.getShoppingByOneStore()
      .subscribe((data: any) => {
        console.log(data);
        this.isloading.next(false);
        this.pendingOrder.next([]);
        if (data.status === 402) {
          return;
        }
        console.log(data);
        this.pendingOrder.next(data);
      });
  }

  fetchWithoutDispatching() {
    this.isloadingThree.next(true);
    this.orderService.getWithoutDispatching()
      .subscribe((res: any) => {
        console.log(res);
        this.isloadingThree.next(false);
        if (res.status === 402) {
          this.WithoutDispatching.next([]);
          return;
        }
        this.WithoutDispatching.next(res);
      });
  }

  fetchDispatchedOrders() {
    this.isloadingFour.next(true);
    this.orderService.getDispatchedOrders()
      .subscribe((res: any) => {
        console.log(res);
        this.isloadingFour.next(false);
        if (res.status === 402) {
          this.dispatchedOrders.next([]);
          return;
        }
        this.dispatchedOrders.next(res);
      });
  }

  fetchCanceledOrders() {
    this.isloadingFive.next(true);
    this.orderService.getCanceledOrders()
      .subscribe((res: any) => {
        console.log(res);
        this.isloadingFive.next(false);
        if (res.status === 402) {
          this.canceledOrders.next([]);
          return;
        }
        this.canceledOrders.next(res);
      });
  }

  fetchHistoryOrder() {
    this.isloadingTwo.next(true);
    this.orderService.getSellsByOneStore()
    .subscribe((data: any) => {
      this.isloadingTwo.next(false);
      if (data.status === 402) {
        this.historyOrder.next([]);
        return;
      }
      console.log(data);
      this.historyOrder.next(data);
    });
  }

  confirmSell(id: number, idCLient: number) {
    this.orderService.confirmSell(id).subscribe(({status, message}: any) => {
      this.openSnackBar(message);
      if (status === 'OK' || status === 402) {
        this.fetchPendingOrder();
        this.fetchWithoutDispatching();
        this.orderService.emitStateOrder({idSell: id, idClient: idCLient});
      }
    });
  }

  dispatchingOrder(id: number) {
    this.orderService.dispatchingOrder(id).subscribe(({status, message}: any) => {
      this.openSnackBar(message);
      if (status === 'OK') {
        this.fetchWithoutDispatching();
        this.fetchDispatchedOrders();
      }
    });
  }

  cancelOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(({status, message}: any) => {
      this.openSnackBar(message);
      if (status === 'OK') {
        this.fetchPendingOrder();
        this.fetchCanceledOrders();
      }
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
