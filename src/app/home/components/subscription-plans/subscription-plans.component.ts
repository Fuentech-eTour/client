import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  @Input() subs: any;

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
