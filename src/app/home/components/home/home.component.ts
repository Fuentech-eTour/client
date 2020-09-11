import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

import Swiper from 'swiper';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  subscriptions = [
    {
      nameProduct: 'Gratis',
      nivel: 'Disfrutalo',
      price: 0,
    },
    {
      nameProduct: 'Basico',
      nivel: 'Medio',
      price: 12000,
    },
    {
      nameProduct: 'Full',
      nivel: 'Sin restricciones',
      price: 28000,
    }
  ];
  mySwiper: Swiper;
  slidesPerView: number;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (window.matchMedia('(max-width: 375px)').matches) {
      this.slidesPerView = 1;
    } else if (window.matchMedia('(max-width: 516px)').matches) {
      this.slidesPerView = 2;
    } else if (window.matchMedia('(max-width: 668px)').matches) {
      this.slidesPerView = 2;
    } else if (window.matchMedia('(max-width: 860px)').matches) {
      this.slidesPerView = 3;
    } else {
      this.slidesPerView = 3;
    }

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: this.slidesPerView,
      spaceBetween: 20,
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
}
