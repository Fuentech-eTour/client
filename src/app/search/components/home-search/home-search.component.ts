import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit, OnDestroy {

  constructor(
    private windowService: WindowService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.windowService.stateHeaderFalse();
  }

}
