import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {
  images: string[] = [
    '../../../assets/images/banner-1.jpg',
    '../../../assets/images/banner-2.jpg',
    '../../../assets/images/banner-3.jpg',
    '../../../assets/images/banner-1.jpg',
    '../../../assets/images/banner-2.jpg'
  ];
  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: false,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        425: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        }
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

}
