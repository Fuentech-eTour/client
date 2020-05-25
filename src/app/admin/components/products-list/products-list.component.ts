import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products = [];
  displayedColumns: string[] = ['id', 'title', 'image', 'price', 'actions'];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getProductsUser()
    .subscribe(products => {
      if (products.length >= 0) {
        this.products = products;
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
