import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '@core/services/cart.service';
import { WindowService } from '@core/services/window.service';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-product-movil',
  templateUrl: './product-movil.component.html',
  styleUrls: ['./product-movil.component.scss']
})
export class ProductMovilComponent implements OnInit {

  @Input() product: Product;

  constructor() {}

  ngOnInit() {}
}
