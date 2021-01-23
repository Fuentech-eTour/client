import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BtnAddCountComponent } from '../../../shared/components/btn-add-count/btn-add-count.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '@core/models/product.model';
import { CartService } from '@core/services/cart.service';
import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input() product: any;
    @ViewChild(BtnAddCountComponent) btnAdd: BtnAddCountComponent;
    favoriteProducts$: Observable<any>;
    estadoHover = false;
    idp: number;
    subscribeBtn = false;
    stateSpinner = false;

    constructor(
        private cartService: CartService,
        private productsService: ProductsService,
        private authService: AuthService,
        private windowService: WindowService,
        private dialog: MatDialog,
    ) {
      this.favoriteProducts$ = this.productsService.favoriteProducts$;
    }

    ngOnInit() {
      this.favoriteProducts$.subscribe((products: any) => {
        if (Array.isArray(products)) {
          const validation = products.filter(product => product.id === this.product.id);
          if (validation.length > 0) {
            this.subscribeBtn = true;
          } else {
            this.subscribeBtn = false;
          }
        }
      });
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

    subscribe(idproduct: number) {
      this.windowService.session$.subscribe(rol => {
        if (rol === 'isClient') {
          this.stateSpinner = true;
          this.productsService.createFavoritiesProducts({idproducto: idproduct}).subscribe((res: any) => {
            this.stateSpinner = false;
            if (res.status === 'OK' || res.status === 'Ok') {
                this.subscribeBtn = !this.subscribeBtn;
            }
          });
        }
      });
    }
}
