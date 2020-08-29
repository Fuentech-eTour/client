import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../../../product/components/product-detail/product-detail.component';
import { Product } from '@core/models/product.model';
import { AddProduct } from '@core/models/addProduct.model';
import { Store } from '@core/models/store.model';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() mostrar: any;

  products: Product[] = [];
  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  store$: Observable<Store[]>;
  sideBarOpen$: Observable<boolean>;
  sideBarOpenIzq$: Observable<boolean>;
  showFiller = false;
  slidesPerView: number;
  panelOpenState = false;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
  ) {
    this.products$ = this.cartService.cart$;
    this.totalCompra$ = this.cartService.precioTotal$;
    this.sideBarOpen$ = this.cartService.openSideBar$;
    this.sideBarOpenIzq$ = this.cartService.openSideBarIzq$;
    this.store$ = this.cartService.order$;
  }

  ngOnInit(): void {
    this.store$.subscribe(console.log);
  }

  openDialogDetailProduct(idp: number): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: 'auto',
      data: {id: idp}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }

  toggleSideBarIzq() {
    this.cartService.sideBarTogglerIzq();
  }

}
