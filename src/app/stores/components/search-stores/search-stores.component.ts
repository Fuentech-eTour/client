import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-search-stores',
  templateUrl: './search-stores.component.html',
  styleUrls: ['./search-stores.component.scss']
})
export class SearchStoresComponent implements OnInit {

  stores: [];
  message: boolean;
  state$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private storesService: StoresService,
    private route: ActivatedRoute,
    private windowService: WindowService,
  ) {
    this.windowService.loadingTrue();
    this.state$ = this.route.params
          .pipe(
            switchMap((params: Params) => {
              return this.storesService.getStoreByName(params.name, 0);
            })
          );
    this.stores = [];
    this.message = false;
   }

  ngOnInit(): void {
    this.state$.subscribe((state: any) => {
      if (state.status === '402') {
        this.message = true;
        this.stores = [];
        this.windowService.loadingFalse();
      } else {
        this.message = false;
        if (state.length !== 0 || this.isLoading$) {
          this.stores = state;
          this.windowService.loadingFalse();
        }
      }
    });
  }
}
