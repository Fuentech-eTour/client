import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner-gifs',
  templateUrl: './banner-gifs.component.html',
  styleUrls: ['./banner-gifs.component.scss']
})
export class BannerGifsComponent implements OnInit, AfterViewInit {

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
