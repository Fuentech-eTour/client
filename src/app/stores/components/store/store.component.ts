import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  store$: Observable<any>;
  nameStore: string;
  imagent: string;

  constructor(
    private storesService: StoresService,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.windowService.stateFooterFalse();
  }

  ngOnInit(): void {
    this.windowService.loadingTrue();
    this.store$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.storesService.getProductsByTagsOneStore(params.id);
      })
    );
    this.store$.subscribe(store => {
      console.log(store);
      this.nameStore = store[0].razonsocial;
      this.imagent = store[0].imagen;
      this.windowService.loadingFalse();
    });
    if (this.authService.loggedIn()) {
      this.storesService.getStoreFavorite().subscribe(data => {
        this.storesService.stateFavoriteStore(data);
      });
      this.productsService.getFavoriteProducts().subscribe(data => {
        this.productsService.stateFavoriteProducts(data);
      });
    }
  }

  backHistory() {
    window.history.back();
  }

  ngOnDestroy() {
    this.windowService.stateFooterTrue();
  }

}
