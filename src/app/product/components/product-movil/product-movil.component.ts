import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BtnAddCountComponent } from '../../../shared/components/btn-add-count/btn-add-count.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '@core/models/product.model';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-product-movil',
  templateUrl: './product-movil.component.html',
  styleUrls: ['./product-movil.component.scss']
})
export class ProductMovilComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @ViewChild(BtnAddCountComponent) btnAdd: BtnAddCountComponent;

  constructor(
    private dialog: MatDialog,
    private windowService: WindowService
  ) {
    this.windowService.stateFooterFalse();
  }

  ngOnInit() {}

  openDialogDetailProduct(): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: 'auto',
      data: {id: this.product.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.runState();
    });
  }

  runState() {
    this.btnAdd.stateAddProduct();
  }

  ngOnDestroy() {
    this.windowService.stateFooterTrue();
  }
}
