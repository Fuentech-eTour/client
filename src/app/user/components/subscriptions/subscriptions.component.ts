import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject } from 'rxjs';
import { StoresService } from '@core/services/stores.service';
import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumnsOne: string[] = ['Tienda', 'Acciones'];

  private stores = new BehaviorSubject<any>([]);
  stores$ = this.stores.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();

  private products = new BehaviorSubject<any>([]);
  products$ = this.products.asObservable();
  private isloadingTwo = new BehaviorSubject<boolean>(true);
  isloadingTwo$ = this.isloadingTwo.asObservable();

  constructor(
    private storesService: StoresService,
    private productsService: ProductsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchStoresFavorite();
    this.fetchProductsFavotite();
    if (this.authService.loggedIn()) {
      this.productsService.getFavoriteProducts().subscribe(data => {
        this.productsService.stateFavoriteProducts(data);
      });
    }
  }

  fetchStoresFavorite() {
    this.isloading.next(true);
    this.storesService.getStoreFavorite().subscribe(data => {
      this.isloading.next(false);
      this.stores.next(data);
    });
  }

  fetchProductsFavotite() {
    this.isloadingTwo.next(true);
    this.productsService.getFavoriteProducts().subscribe(data => {
      this.isloadingTwo.next(false);
      this.products.next(data);
    });
    this.products$.subscribe(console.log);
  }

  unsubscribe(idstore: number) {
    this.isloading.next(true);
    this.storesService.subscriptionStore({idtienda: idstore}).subscribe((res: any) => {
      if (res.status === 'OK' || res.status === 'Ok') {
        this.fetchStoresFavorite();
      }
      this.isloading.next(false);
    });
  }

}
