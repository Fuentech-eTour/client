import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../../../product/components/product-detail/product-detail.component';
import { AddProduct } from '@core/models/addProduct.model';
import { Store } from '@core/models/store.model';
import { CartService } from '@core/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() mostrar: any;

  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  store$: Observable<Store[]>;
  showFiller = false;
  slidesPerView: number;
  panelOpenState = false;
  products: [];
  private stateNote = new BehaviorSubject<boolean>(false);
  stateNote$ = this.stateNote.asObservable();

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
  ) {
    this.products$ = this.cartService.cart$;
    this.totalCompra$ = this.cartService.precioTotal$;
    this.store$ = this.cartService.order$;
  }

  ngOnInit(): void {
    this.products$.subscribe((products: any) => {
      this.products = products;
    });
    this.store$.subscribe(stores => {
      if (stores.length === 0) {
        this.stateNote.next(false);
      }
      for (const store of stores) {
        if (store.valormin > (store.total - store.valordomicilio)) {
          this.stateNote.next(true);
          break;
        } else {
          this.stateNote.next(false);
        }
      }
    });
  }

  openDialogDetailProduct(idp: number): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: 'auto',
      data: {id: idp}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  emptyCartByOneStore(idStore: number) {
    const newProducts = this.products.filter((product: any) => product.idststore === idStore);
    for (let i = 0; i <= newProducts.length; i++) {
      const prod: any = newProducts[i];
      for (let j = 0; j < prod?.cant; j++) {
        this.cartService.removeCart(newProducts[i]);
      }
    }
  }

  emptyCart() {
    this.cartService.resetOrder();
  }

}
