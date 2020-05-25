import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../core/models/product.model';
import { AddProduct } from '../../../core/models/addProduct.model';

import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-count-products',
  templateUrl: './count-products.component.html',
  styleUrls: ['./count-products.component.scss']
})
export class CountProductsComponent implements OnInit {

  @Input() product: Product;

  addProduct$: Observable<AddProduct[]>;

    constructor(
        private cartService: CartService
    ) {
        this.addProduct$ = this.cartService.cart$;
     }

  ngOnInit(): void {
  }

  addCart() {
    this.cartService.addCart(this.product);
    this.cartService.addPrice(this.product.price);
  }

  removeCart() {
      this.cartService.removeCart(this.product);
      this.cartService.removePrice(this.product.price);
  }

}
