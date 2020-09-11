import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderDetail$: Observable<any>;
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Cantidad', 'Subtotal'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderDetail$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        if (localStorage.getItem('newOrders')) {
          const newOrderUnreviewed = JSON.parse(localStorage.getItem('newOrders'));
          const newData = newOrderUnreviewed.filter((data: any) => data.order !== parseInt(params.id, 10));
          localStorage.setItem('newOrders', JSON.stringify(newData));
        }
        return this.orderService.getOneSellById(params.id);
      })
    );
    this.orderDetail$.subscribe(console.log);
  }

}
