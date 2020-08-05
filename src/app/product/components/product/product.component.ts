import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../core/models/product.model';

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
        this.cartService.addCart(this.product);
        this.cartService.addPrice(this.product.valorventa);
    }
}
