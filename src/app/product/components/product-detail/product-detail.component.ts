import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/models/product.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from './../../../core/services/cart.service';

import Swiper from 'swiper';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {

  product$: Observable<Product>;
  mySwiper: Swiper;
  showFiller = false;
  slidesPerView: number;
  nameBannerOne = 'Similares';
  nameBannerTwo = 'Acompañantes';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.product$ = this.productsService.getProduct(this.data.id);
  }

  ngAfterViewInit() {
    if (window.screen.width <= 425) {
      this.slidesPerView = 2;
    } else if (window.screen.width <= 768) {
      this.slidesPerView = 3;
    } else {
      this.slidesPerView = 6;
    }

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: this.slidesPerView, // para movil 2, para tablet 3, para portatil 6
      spaceBetween: 15,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  addCart() {
    this.product$.subscribe((product) => {
      this.cartService.addCart(product);
    });
    this.product$.subscribe((product) => {
      this.cartService.addPrice(product.valorventa);
    });
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
