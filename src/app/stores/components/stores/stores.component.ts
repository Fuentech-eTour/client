import { Component, OnInit } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@core/models/store.model';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: Store[] = [];

  constructor(
    private storesService: StoresService,
    private windowService: WindowService,
    private productsService: ProductsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchStores();
    if (this.authService.loggedIn()) {
      this.storesService.getStoreFavorite().subscribe(data => {
        this.storesService.stateFavoriteStore(data);
      });
      this.productsService.getFavoritePorducts().subscribe(data => {
        this.productsService.stateFavoriteProducts(data);
      });
    }
  }

  fetchStores() {
    this.windowService.loadingTrue();
    this.storesService.getAllStores()
    .subscribe(stores => {
      this.stores = stores;
      this.windowService.loadingFalse();
    });
  }

}
