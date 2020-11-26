import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { WindowService } from '@core/services/window.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  private displayFooter = new BehaviorSubject<boolean>(true);
  displayFooter$ = this.displayFooter.asObservable();
  private displayHeader = new BehaviorSubject<boolean>(true);
  displayHeader$ = this.displayHeader.asObservable();
  windowWidth: number = window.screen.width;

  constructor(
    private windowService: WindowService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.windowService.stateDisplayFooter$
    .pipe(
      delay(0),
      tap(res => this.displayFooter.next(res) )
    ).subscribe();
    this.windowService.stateDisplayHeader$
    .pipe(
      delay(0),
      tap(res => this.displayHeader.next(res) )
    ).subscribe();
  }

  ngOnDestroy() {
    this.windowService.stateFooterFalse();
  }
}
