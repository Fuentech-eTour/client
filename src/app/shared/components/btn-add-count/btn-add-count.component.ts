import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-btn-add-count',
  templateUrl: './btn-add-count.component.html',
  styleUrls: ['./btn-add-count.component.scss']
})
export class BtnAddCountComponent implements OnInit {

  @Input() product: Product;
  addProduct$: Observable<any>;
  addProductState$: Observable<[any]>;
  addState: boolean;

  constructor(
    private cartService: CartService,
  ) {
    this.addState = true;
    this.addProduct$ = this.cartService.cart$;
  }

  ngOnInit() {
    this.stateAddProduct();
  }

  addCart() {
    this.cartService.addCart(this.product);
    this.cartService.addPrice(this.product.valorventa);
  }

  removeCart() {
    this.cartService.removeCart(this.product);
    this.cartService.removePrice(this.product.valorventa);
  }

  stateAddProduct() {
    this.addProduct$.subscribe((products: any) => {
      for (const product of products) {
        if (product.id === this.product.id) {
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

}
