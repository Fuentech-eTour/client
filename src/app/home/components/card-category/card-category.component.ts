import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {

  @Input() tags: any;

  estadoHover = false;

  constructor() { }

  ngOnInit(): void {
  }

  mouseEnter(div: string) {
    this.estadoHover = true;
  }

  mouseLeave(div: string) {
     this.estadoHover = false;
  }

}
