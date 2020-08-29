import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

  isLoading$: Observable<boolean>;
  form: FormGroup;

  constructor(
    private windowService: WindowService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
    this.isLoading$ = this.windowService.isloading$;
   }

  ngOnInit(): void {
  }

  searchStore(value: string) {
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
