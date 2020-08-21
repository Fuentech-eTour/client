import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BtnAddCountComponent } from '../../../shared/components/btn-add-count/btn-add-count.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input() product: any;
    @ViewChild(BtnAddCountComponent) btnAdd: BtnAddCountComponent;
    estadoHover = false;
    idp: number;

    constructor(
        private cartService: CartService,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
    }

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

    mouseEnter(div: string) {
        this.estadoHover = true;
     }

     mouseLeave(div: string) {
       this.estadoHover = false;
     }

    addCart() {
        this.cartService.addCart(this.product);
        this.cartService.addPrice(this.product.valorventa);
    }
}
