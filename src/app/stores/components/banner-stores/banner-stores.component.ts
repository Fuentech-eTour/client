import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Store } from '../../../core/models/store.model';

import { CartService } from './../../../core/services/cart.service';
import { StoresService } from './../../../core/services/stores.service';
import { AuthService } from '@core/services/auth.service';

import Swiper from 'swiper';
import { Observable } from 'rxjs';
import { isArray } from 'util';

@Component({
  selector: 'app-banner-stores',
  templateUrl: './banner-stores.component.html',
  styleUrls: ['./banner-stores.component.scss']
})
export class BannerStoresComponent implements OnInit, AfterViewInit {

  @Input() store: Store;
  favoriteStores$: Observable<any>;
  estadoHover = false;
  showFiller = false;
  subscribeBtn = false;
  stateSpinner = false;
  mySwiper: Swiper;

  constructor(
    private cartService: CartService,
    private storesService: StoresService,
    private authService: AuthService,
  ) {
    this.favoriteStores$ = this.storesService.favoriteStores$;
   }

  ngOnInit(): void {
    this.favoriteStores$.subscribe((stores: any) => {
      if (Array.isArray(stores)) {
        const validation = stores.filter(store => store.id === this.store.id);
        if (validation.length > 0) {
          this.subscribeBtn = true;
        } else {
          this.subscribeBtn = false;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        360: {
          slidesPerView: 2,
        },
        550: {
          slidesPerView: 3,
        },
        720: {
          slidesPerView: 4,
        },
        900: {
          slidesPerView: 5,
        },
        1100: {
          slidesPerView: 6,
        }
      }
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
        this.cartService.addPrice(this.store.products[i].valorventa);
      }
    }
  }

  subscribe(idstore: number) {
    if (this.authService.loggedIn()) {
      this.stateSpinner = true;
      this.storesService.subscriptionStore({idtienda: idstore}).subscribe((res: any) => {
        console.log(res);
        this.stateSpinner = false;
        if (res.status === 'OK' || res.status === 'Ok') {
            this.subscribeBtn = !this.subscribeBtn;
        }
      });
    }
  }

}
