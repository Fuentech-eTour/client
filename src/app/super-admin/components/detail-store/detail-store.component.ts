import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WindowService } from '@core/services/window.service';
import { StoresService } from '@core/services/stores.service';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.scss']
})
export class DetailStoreComponent implements OnInit {

  detailStore: any;
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Cantidad', 'Subtotal'];

  constructor(
    private route: ActivatedRoute,
    private windowService: WindowService,
    private storesService: StoresService,
  ) {
    this.windowService.loadingTrue();
   }

  ngOnInit(): void {
    this.windowService.loadingTrue();
    this.route.params
    .subscribe((params: Params) => {
      this.storesService.getOneStores(params.id).subscribe(data => {
        this.windowService.loadingFalse();
        this.detailStore = data;
      });
    });
  }

}
