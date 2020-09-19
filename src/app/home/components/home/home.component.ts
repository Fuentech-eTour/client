import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowService } from '@core/services/window.service';

import Swiper from 'swiper';
import { TagsService } from '@core/services/tags.service';
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
  tagsStores: any;
  tagsProducts: any;

  constructor(
    private tagsService: TagsService,
    private windowService: WindowService,
  ) {}

  ngOnInit(): void {
    this.windowService.stateFooterTrue();
    this.tagsService.getAllTagsStores().subscribe(data => {
      this.tagsStores = data;
    });
    this.tagsService.getAllTagsProducts().subscribe(data => {
      this.tagsProducts = data;
    });
  }

  ngOnDestroy() {
    this.windowService.stateFooterFalse();
  }
}
