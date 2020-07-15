import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.productsService.getProduct(params.id);
      })
    );
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
      /* pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }, */
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

  /* createProduct() {
    const newProduct: Product = {
      id: '230',
      title: 'Lo mejor',
      image: 'assets\images\banner-1.jpg',
      price: 3000,
      description: 'Este es un nuevo producto'
    };

    this.productsService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 45000,
      description: 'Producto editado exitosamente'
    };

    this.productsService.updateProduct('2', updateProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct('2255')
    .subscribe(rta => {
      console.log(rta);
    });
  }

  getFile() {
    this.productsService.getFile()
    .subscribe(content => {
      console.log(content);
      const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, 'hello world.txt');
    });
  } */

}
