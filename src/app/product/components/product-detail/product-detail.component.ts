import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/models/product.model';
import { Observable } from 'rxjs';
import { CartService } from './../../../core/services/cart.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;
  showFiller = false;
  slidesPerView: number;
  nameBannerOne = 'Similares';
  nameBannerTwo = 'Acompañantes';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.product$ = this.productsService.getProduct(this.data.id);
  }

  /*
  getFile() {
    this.productsService.getFile()
    .subscribe(content => {
      console.log(content);
      const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, 'hello world.txt');
    });
  } */

}
