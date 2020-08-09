import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
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
    private router: Router,
  ) {
    this.windowService.stateFooterFalse();
  }

  ngOnInit(): void {
    this.windowService.loadingTrue();
    this.store$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.storesService.getProductsOneStore(params.id);
      })
    );
    this.store$.subscribe(store => {
      this.nameStore = store[0].razonsocial;
      this.imagent = store[0].imagen;
      this.windowService.loadingFalse();
    });
  }

  backHistory() {
    window.history.back();
  }

  ngOnDestroy() {
    this.windowService.stateFooterTrue();
  }

}
