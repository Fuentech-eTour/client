import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoresService } from '@core/services/stores.service';

@Component({
  selector: 'app-sidebar-store',
  templateUrl: './sidebar-store.component.html',
  styleUrls: ['./sidebar-store.component.scss']
})
export class SidebarStoreComponent implements OnInit {

  @Input() store: Observable<any>;
  store$: Observable<any>;
  categoriasProductos: [];

  constructor(
    private storesService: StoresService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store$ = this.storesService.getTagsOneStore(this.store[0].id);
    this.store$.subscribe((store: any) => {
      this.categoriasProductos = store[0].tags;
    });
  }

}
