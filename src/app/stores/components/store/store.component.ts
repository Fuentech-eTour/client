import { Component, OnInit } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { productos } from '@core/services/prueba.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  // products$: Observable<any>;
  nameStore: string;
  products$ = productos;

  constructor(
    private storesService: StoresService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    /* this.products$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.storesService.getProductsOneStore(params.id);
      })
    );
    this.products$.subscribe(product => {
      this.nameStore = product[0].user_name;
    }); */
  }

}
