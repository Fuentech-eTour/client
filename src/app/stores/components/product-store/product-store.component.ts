import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../core/models/product.model';

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

    constructor(
        private cartService: CartService
    ) {}

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
      console.log(this.product);
      console.log(this.razonsocial);
      this.cartService.addCart(this.product);
      this.cartService.addPrice(this.product.valorventa);
    }

}
