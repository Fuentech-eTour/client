import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '@core/services/order.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit {

  orderDetail$: Observable<any>;
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Cantidad', 'Subtotal'];

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
        /* if (localStorage.getItem('newOrders')) {
          const newOrderUnreviewed = JSON.parse(localStorage.getItem('newOrders'));
          const newData = newOrderUnreviewed.filter((data: any) => data.order !== parseInt(params.id, 10));
          localStorage.setItem('newOrders', JSON.stringify(newData));
        } */
        return this.orderService.getOnePurchasesByIdClient(params.id);
      })
    );
    this.orderDetail$.subscribe((res: any) => {
      console.log(res);
      this.windowService.loadingFalse();
    });
  }

}
