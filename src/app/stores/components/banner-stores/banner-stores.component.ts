import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Store } from '../../../core/models/store.model';

import { CartService } from './../../../core/services/cart.service';
import { StoresService } from './../../../core/services/stores.service';

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
  subscribeBtn = false;

  constructor(
    private cartService: CartService,
    private storesService: StoresService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (window.matchMedia('(max-width: 375px)').matches) {
      this.slidesPerView = 2;
    } else if (window.matchMedia('(max-width: 516px)').matches) {
      this.slidesPerView = 3;
    } else if (window.matchMedia('(max-width: 668px)').matches) {
      this.slidesPerView = 4;
    } else if (window.matchMedia('(max-width: 860px)').matches) {
      this.slidesPerView = 5;
    } else {
      this.slidesPerView = 6;
    }

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: this.slidesPerView,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    /* this.mySwiper = new Swiper('.swiper-container-1', {
      slidesPerView: 2,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    this.mySwiper = new Swiper('.swiper-container-2', {
      slidesPerView: 3,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    this.mySwiper = new Swiper('.swiper-container-3', {
      slidesPerView: 4,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    this.mySwiper = new Swiper('.swiper-container-4', {
      slidesPerView: 5,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    this.mySwiper = new Swiper('.swiper-container-5', {
      slidesPerView: 6,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }); */
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
        this.cartService.addPrice(this.store.products[i].valorventa);
      }
    }
  }

  subscribe(store: Store) {
    if (this.subscribeBtn === false) {
      this.storesService.createSubscription(store);
    }
  }

}
