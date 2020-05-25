import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  ngOnInit(): void {
  }

  // tslint:disable-next-line: member-ordering
  title = 'platzi-store';

  // tslint:disable-next-line: member-ordering
  items = ['dainer', 'eduardo', 'acosta'];

  // tslint:disable-next-line: member-ordering
  power = 10;

  addItems() {
    this.items.push(this.title);
  }

  deleteItems(index: number) {
    this.items.splice(index, 1);
  }

}
