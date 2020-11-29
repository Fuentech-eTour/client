import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '@core/services/order.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-purchase-detail-container',
  templateUrl: './purchase-detail.container.html',
  styleUrls: ['./purchase-detail.container.scss']
})
// tslint:disable-next-line: component-class-suffix
export class PurchaseDetailContainer implements OnInit {

  orderDetail$: Observable<any>;
  orderDetail: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private windowService: WindowService,
  ) {
    this.windowService.loadingTrue();
   }

  ngOnInit(): void {
    this.windowService.loadingTrue();
    this.orderDetail$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.orderService.getOnePurchasesByIdClient(params.id);
      })
    );
    this.orderDetail$.subscribe((res: any) => {
      this.orderDetail = res;
      this.windowService.loadingFalse();
    });
  }

}
