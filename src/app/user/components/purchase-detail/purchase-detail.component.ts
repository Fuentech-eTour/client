import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit {

  @Input() orderDetail: any;
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Cantidad', 'Subtotal'];

  constructor() {}

  ngOnInit() {
  }

}
