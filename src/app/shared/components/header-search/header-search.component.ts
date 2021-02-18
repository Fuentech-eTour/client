import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { WindowService } from '@core/services/window.service';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit, AfterViewInit {

  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  form: FormGroup;

  constructor(
    private windowService: WindowService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.windowService.isloading$
    .pipe(
      delay(0),
      tap(res => this.isLoading.next(res))
    ).subscribe();
  }

  searchStore($event: KeyboardEvent, value: any) {
    if ($event.key === 'Enter' && !$event.shiftKey) {
      $event.preventDefault();
      if (value !== '') {
        this.router.navigate(['/search', value]);
      }
    } 
    if ($event.type === 'click') {
      if (value !== '') {
        this.router.navigate(['/search', value]);
      }
    }
  }

  searchStoreBtn(value: any) {
    if (value !== '') {
      this.router.navigate(['/search', value]);
    }
  }

  closedSearch() {
    this.windowService.stateHeaderFalse();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      search: [''],
    });
  }

}
