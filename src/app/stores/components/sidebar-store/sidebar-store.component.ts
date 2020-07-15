import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-store',
  templateUrl: './sidebar-store.component.html',
  styleUrls: ['./sidebar-store.component.scss']
})
export class SidebarStoreComponent implements OnInit {

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
