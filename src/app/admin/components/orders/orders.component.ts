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
  private pendingOrder = new BehaviorSubject<any[]>([]);
  pendingOrder$ = this.pendingOrder.asObservable();
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
    this.fetchHistoryOrder();
  }

  fetchPendingOrder() {
    this.isloading.next(true);
    this.orderService.getShoppingByOneStore()
      .subscribe((data: any) => {
        console.log(data);
        this.isloading.next(false);
        if (data.status === 402) {
          return;
        }
        console.log(data);
        this.pendingOrder.next(data);
      });
  }

  fetchHistoryOrder() {
    this.isloadingTwo.next(true);
    this.orderService.getSellsByOneStore()
    .subscribe((data: any) => {
      this.isloadingTwo.next(false);
      if (data.status === 402) {
        return;
      }
      console.log(data);
      this.historyOrder.next(data);
    });
  }

  confirmSell(id: number, idCLient: number) {
    this.orderService.confirmSell(id).subscribe(({status, message}: any) => {
      this.openSnackBar(message);
      if (status === 'OK') {
        this.fetchPendingOrder();
        this.orderService.emitStateOrder({idSell: id, idClient: idCLient});
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
