import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { ProductsService } from '@core/services/products/products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  store$: Observable<any>;
  nameStore: string;
  imagent: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storesService: StoresService,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private productsService: ProductsService,
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
      this.nameStore = store[0].razonsocial;
      this.imagent = store[0].imagen;
      this.windowService.loadingFalse();
    });
    this.infoSession();
  }

  infoSession() {
    this.windowService.session$.subscribe(state => {
      if (state === 'isClient') {
        this.storesService.getStoreFavorite().subscribe(data => {
          this.storesService.stateFavoriteStore(data);
        });
        this.productsService.getFavoriteProducts().subscribe(data => {
          this.productsService.stateFavoriteProducts(data);
        });
      }
    });
  }

  backHistory() {
    window.history.back();
  }

  ngOnDestroy() {
    this.windowService.stateFooterTrue();
  }

}
