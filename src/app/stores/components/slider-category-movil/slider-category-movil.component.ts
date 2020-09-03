import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'app-slider-category-movil',
  templateUrl: './slider-category-movil.component.html',
  styleUrls: ['./slider-category-movil.component.scss']
})
export class SliderCategoryMovilComponent implements OnInit, AfterViewInit {

  @Input() store: Observable<any>;
  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 1,
    });
  }

}
