import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../../../product/components/product-detail/product-detail.component';
import { Product } from '../../../core/models/product.model';
import { AddProduct } from '../../../core/models/addProduct.model';

import { CartService } from '@core/services/cart.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent implements OnInit {

  @Input() product: Product;
  @Input() razonsocial: string;
  @Input() imagen: string;
  estadoHover = false;
  addProduct$: Observable<AddProduct[]>;
  addState: boolean;

    constructor(
        private cartService: CartService,
        private windowService: WindowService,
        private dialog: MatDialog,
    ) {
      this.addState = true;
      this.addProduct$ = this.cartService.cart$;
      this.windowService.loadingTrue();
      this.addProduct$.subscribe(() => {
        this.windowService.loadingFalse();
      });
    }

    ngOnInit() {
      this.stateAddProduct();
    }

    stateAddProduct() {
      this.addProduct$.subscribe((products: any) => {
        for (const product of products) {
          if (product.id === this.product.id && products.length !== 0) {
            this.addState = false;
            break;
          } else {
            this.addState = true;
          }
        }
        if (products.length === 0) {
          this.addState = true;
        }
      });
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
      this.product.razonsocial = this.razonsocial;
      this.product.imagent = this.imagen;
      this.cartService.addCart(this.product);
      this.cartService.addPrice(this.product.valorventa);
    }

    removeCart() {
        this.cartService.removeCart(this.product);
        this.cartService.removePrice(this.product.valorventa);
        this.stateAddProduct();
    }

}
