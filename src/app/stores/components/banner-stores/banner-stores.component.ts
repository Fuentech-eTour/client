import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Store } from '../../../core/models/store.model';

import { CartService } from './../../../core/services/cart.service';

import Swiper from 'swiper';

@Component({
  selector: 'app-banner-stores',
  templateUrl: './banner-stores.component.html',
  styleUrls: ['./banner-stores.component.scss']
})
export class BannerStoresComponent implements OnInit, AfterViewInit {

  @Input() store: Store;
  estadoHover = false;
  mySwiper: Swiper;
  showFiller = false;
  slidesPerView: number;
  windowWidth: number = window.screen.width;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
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

  mouseEnter() {
    this.estadoHover = true;
  }

  mouseLeave() {
   this.estadoHover = false;
  }

  addCart(id: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.store.products.length; i++) {
      if (this.store.products[i].id === id) {
        this.cartService.addCart(this.store.products[i]);
        this.cartService.addPrice(this.store.products[i].price);
      }
    }
}

}
