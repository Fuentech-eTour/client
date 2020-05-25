import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-banner-products',
  templateUrl: './banner-products.component.html',
  styleUrls: ['./banner-products.component.scss']
})
export class BannerProductsComponent implements OnInit {

  @Input() nameBanner: string;
  estadoHover = false;

  images: string[] = [
    './../../assets/images/product-1.jpg',
    './../../assets/images/product-2.jpg',
    './../../assets/images/product-3.jpg',
    './../../assets/images/product-4.jpg',
    './../../assets/images/product-5.jpg',
    './../../assets/images/product-6.jpg',
    './../../assets/images/product-1.png',
    './../../assets/images/product-2.png',
    './../../assets/images/product-3.png',
    './../../assets/images/product-4.png',
    './../../assets/images/product-5.png',
    './../../assets/images/product-6.png'
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  mouseEnter() {
    this.estadoHover = true;
  }

  mouseLeave() {
   this.estadoHover = false;
  }

}
