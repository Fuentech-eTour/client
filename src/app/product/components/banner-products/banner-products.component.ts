import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-banner-products',
  templateUrl: './banner-products.component.html',
  styleUrls: ['./banner-products.component.scss']
})
export class BannerProductsComponent implements OnInit {

  @Input() nameBanner: string;
  estadoHover = false;

  images: string[] = [];

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
