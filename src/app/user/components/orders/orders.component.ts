import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { OrderService } from '@core/services/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['Orden', 'Acciones'];
  private purchases = new BehaviorSubject<any[]>([]);
  purchases$ = this.purchases.asObservable();
  private purchasesConfirmed = new BehaviorSubject<any[]>([]);
  purchasesConfirmed$ = this.purchasesConfirmed.asObservable();
  private withoutDispatching = new BehaviorSubject<any[]>([]);
  withoutDispatching$ = this.withoutDispatching.asObservable();
  private purchasesCanceled = new BehaviorSubject<any[]>([]);
  purchasesCanceled$ = this.purchasesCanceled.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private isloadingTwo = new BehaviorSubject<boolean>(true);
  isloadingTwo$ = this.isloadingTwo.asObservable();
  private isloadingThree = new BehaviorSubject<boolean>(true);
  isloadingThree$ = this.isloadingThree.asObservable();
  private isloadingFour = new BehaviorSubject<boolean>(true);
  isloadingFour$ = this.isloadingFour.asObservable();

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.fetchPurchese();
    this.fetchPurchasesConfirmed();
    this.fetchPurchasesWithoutDispatching();
    this.fetchPurchasesCanceled();
  }

  fetchPurchese() {
    this.isloading.next(true);
    this.orderService.getPurchasesByIdClient()
      .subscribe((data: any) => {
        this.isloading.next(false);
        if (data.status === 402) {
          return;
        }
        this.purchases.next(data);
      });
  }

  fetchPurchasesConfirmed() {
    this.isloadingTwo.next(true);
    this.orderService.getPurchasesConfirmedByIdClient()
      .subscribe((data: any) => {
        this.isloadingTwo.next(false);
        if (data.status === 402) {
          return;
        }
        this.purchasesConfirmed.next(data);
      });
  }

  fetchPurchasesWithoutDispatching() {
    this.isloadingThree.next(true);
    this.orderService.getPurchasesWithoutDispatchingByIdClient()
      .subscribe((data: any) => {
        this.isloadingThree.next(false);
        if (data.status === 402) {
          return;
        }
        this.withoutDispatching.next(data);
      });
  }

  fetchPurchasesCanceled() {
    this.isloadingFour.next(true);
    this.orderService.getPurchasesCanceledByIdClient()
      .subscribe((data: any) => {
        this.isloadingFour.next(false);
        if (data.status === 402) {
          return;
        }
        this.purchasesCanceled.next(data);
      });
  }

}
