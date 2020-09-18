import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowService } from '@core/services/window.service';

import Swiper from 'swiper';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

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

  constructor(
    private windowService: WindowService,
  ) {}

  ngOnInit(): void {
    this.windowService.stateFooterTrue();
  }

  ngOnDestroy() {
    this.windowService.stateFooterFalse();
  }
}
