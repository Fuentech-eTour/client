import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-purchases-details',
  templateUrl: './purchases-details.container.html',
  styleUrls: ['./purchases-details.container.scss']
})
// tslint:disable-next-line: component-class-suffix
export class PurchasesDetailsContainer implements OnInit {

  ordersDetail = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.fetchPurchasesDetails();
  }

  fetchPurchasesDetails() {
    this.orderService.currentSells$
    .subscribe((data: any[]) => {
      for (const sell of data) {
        this.orderService.getOnePurchasesByIdClient(sell.idSell)
        .subscribe(res => {
          this.ordersDetail.push(res);
        });
      }
    });
  }

}
