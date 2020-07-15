import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  categoriasTiendas = [
    'Abarrotes',
    'Farmacias',
    'Hoteles',
    'Restaurantes',
  ];
  categoriasProductos = [
    'Aseo',
    'Deportes',
    'Electrodomesticos',
    'Juguetes'
  ];

  @Input() mostrar2: any;

  constructor() { }

  ngOnInit(): void {
  }

}
