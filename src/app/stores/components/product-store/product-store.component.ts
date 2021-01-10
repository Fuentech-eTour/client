import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../../../product/components/product-detail/product-detail.component';
import { Product } from '../../../core/models/product.model';
import { AddProduct } from '../../../core/models/addProduct.model';

import { CartService } from '@core/services/cart.service';
import { WindowService } from '@core/services/window.service';
import { ProductsService } from '@core/services/products/products.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent implements OnInit {

  @Input() product: Product;
  @Input() razonsocial: string;
  @Input() imagen: string;
  //@ViewChild('lImage') lImage : ElementRef;
  
  addProduct$: Observable<AddProduct[]>;
  favoriteProducts$: Observable<any>;
  estadoHover = false;
  addState: boolean;
  loadingImg: boolean;
  subscribeBtn = false;
  stateSpinner = false;

  constructor(
      private cartService: CartService,
      private windowService: WindowService,
      private productsService: ProductsService,
      private dialog: MatDialog,
  ) {
    this.addState = true;
    this.loadingImg = false;
    this.addProduct$ = this.cartService.cart$;
    this.windowService.loadingTrue();
    this.addProduct$.subscribe(() => {
      this.windowService.loadingFalse();
    });
    this.favoriteProducts$ = this.productsService.favoriteProducts$;
  }

  ngOnInit() {
    this.stateAddProduct();
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

  openDialogDetailProduct(): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: 'auto',
      data: {id: this.product.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stateAddProduct();
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
    // this.cartService.addPrice(this.product.valorventa);
  }

  removeCart() {
      this.cartService.removeCart(this.product);
      // this.cartService.removePrice(this.product.valorventa);
      this.stateAddProduct();
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
