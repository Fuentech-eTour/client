import { Component, OnInit } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  store$: Observable<any>;
  nameStore: string;
  imagent: string;

  constructor(
    private storesService: StoresService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.storesService.getProductsOneStore(params.id);
      })
    );
    this.store$.subscribe(store => {
      this.nameStore = store[0].razonsocial;
      this.imagent = store[0].imagen;
    });
  }

}
