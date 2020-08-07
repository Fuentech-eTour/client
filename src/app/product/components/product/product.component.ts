import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input() product: Product;
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
          console.log('The dialog was closed');
        });
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
