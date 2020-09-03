import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-store-movil',
  templateUrl: './info-store-movil.component.html',
  styleUrls: ['./info-store-movil.component.scss']
})
export class InfoStoreMovilComponent implements OnInit {

  @Input() store: Observable<any>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.store);
  }

}
