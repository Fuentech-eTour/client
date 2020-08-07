import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-movil',
  templateUrl: './product-movil.component.html',
  styleUrls: ['./product-movil.component.scss']
})
export class ProductMovilComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit() {}

  openDialogDetailProduct(): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: 'auto',
      data: {id: this.product.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
