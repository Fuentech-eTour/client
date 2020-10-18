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
  stateSeeMoreProducts = true;
  newPageProducts = 0;
  stateSeeMoreStores = true;
  newPageStores = 0;

  constructor(
    private tagsService: TagsService,
    private windowService: WindowService,
  ) {}

  ngOnInit(): void {
    this.windowService.stateFooterTrue();
    this.fetchTagsProducts();
    this.fetchTagsStores();
  }

  fetchTagsProducts() {
    this.tagsService.getTagsProductsForPage(this.newPageProducts).subscribe(data => {
      this.tagsProducts = data;
    });
  }

  seeMoreTagsProducts() {
    this.newPageProducts += 8;
    this.tagsService.getTagsProductsForPage(this.newPageProducts)
    .subscribe((tags: []) => {
      if (tags.length === 0) {
        return;
      }
      if (tags.length < 8) {
        this.stateSeeMoreProducts = false;
      }
      this.tagsProducts = this.tagsProducts.concat(tags);
    });
  }

  fetchTagsStores() {
    this.tagsService.getTagsStoresForPage(this.newPageStores).subscribe(data => {
      this.tagsStores = data;
    });
  }

  seeMoreTagsStores() {
    this.newPageStores += 8;
    this.tagsService.getTagsStoresForPage(this.newPageStores)
    .subscribe((tags: []) => {
      if (tags.length === 0) {
        return;
      }
      if (tags.length < 8) {
        this.stateSeeMoreStores = false;
      }
      this.tagsStores = this.tagsStores.concat(tags);
    });
  }

  ngOnDestroy() {
    this.windowService.stateFooterFalse();
  }
}
