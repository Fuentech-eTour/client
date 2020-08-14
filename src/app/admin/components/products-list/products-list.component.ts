import { Component, OnInit } from '@angular/core';

import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products = [];
  id: string;
  displayedColumns: string[] = ['id', 'Nombre', 'Imagen', 'Precio', 'Acciones'];

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
  ) {
    this.id = authService.getIdStore();
   }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    // tslint:disable-next-line: radix
    this.productsService.getProductsByStore(parseInt(this.id))
    .subscribe((store: any) => {
      console.log(store);
      if (store.length >= 0) {
        this.products = store[0].products;
      }
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id)
    .subscribe(rta => {
      this.fetchProducts();
    });
  }

}
