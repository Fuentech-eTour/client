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
  private historyOrder = new BehaviorSubject<any[]>([]);
  historyOrder$ = this.historyOrder.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.fetchPurcheseClient();
  }

  fetchPurcheseClient() {
    this.isloading.next(true);
    this.orderService.getPurchasesByIdClient()
      .subscribe((data: any) => {
        this.isloading.next(false);
        if (data.status === 402) {
          return;
        }
        console.log(data);
        this.historyOrder.next(data);
      });
  }

}
