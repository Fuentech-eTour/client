import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-store',
  templateUrl: './sidebar-store.component.html',
  styleUrls: ['./sidebar-store.component.scss']
})
export class SidebarStoreComponent implements OnInit {

  @Input() store: Observable<any>;
  nameStore$: any;

  categoriasProductos = [
    'Aseo',
    'Deportes',
    'Electrodomesticos',
    'Juguetes',
    'Ropa',
    'Zapatos',
    'Frutas'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
