import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StoresService } from '@core/services/stores.service';

@Component({
  selector: 'app-search-stores',
  templateUrl: './search-stores.component.html',
  styleUrls: ['./search-stores.component.scss']
})
export class SearchStoresComponent implements OnInit {

  stores$: Observable<any>;

  constructor(
    private storesService: StoresService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.stores$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.storesService.getStoreByName(params.name);
      })
    );
  }

}
