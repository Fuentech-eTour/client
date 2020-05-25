import { Component, OnInit } from '@angular/core';
import { StoresService } from '@core/services/stores.service';
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
  ) { }

  ngOnInit(): void {
    this.fetchStores();
  }

  fetchStores() {
    this.storesService.getAllStores()
    .subscribe(stores => {
      this.stores = stores;
    });
  }

}
