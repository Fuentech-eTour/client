import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../core/models/product.model';
import { AddProduct } from '../../../core/models/addProduct.model';

import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent implements OnInit {

  @Input() product: Product;
  @Input() razonsocial: string;
  estadoHover = false;
  addProduct$: Observable<AddProduct[]>;

    constructor(
        private cartService: CartService
    ) {
      this.addProduct$ = this.cartService.cart$;
    }

    ngOnInit() {
    }

    mouseEnter(div: string) {
        this.estadoHover = true;
    }

    mouseLeave(div: string) {
       this.estadoHover = false;
    }

    addCart() {
      this.product.razonsocial = this.razonsocial;
      this.cartService.addCart(this.product);
      this.cartService.addPrice(this.product.valorventa);
    }

    removeCart() {
        this.cartService.removeCart(this.product);
        this.cartService.removePrice(this.product.valorventa);
    }

}
