import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../core/models/product.model';
import { AddProduct } from '../../../core/models/addProduct.model';

import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-product-store-movil',
  templateUrl: './product-store-movil.component.html',
  styleUrls: ['./product-store-movil.component.scss']
})
export class ProductStoreMovilComponent implements OnInit {

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
