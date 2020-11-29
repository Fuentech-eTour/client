import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TagsService } from '@core/services/tags.service';
import { WindowService } from '@core/services/window.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tags-stores',
  templateUrl: './tags-stores.component.html',
  styleUrls: ['./tags-stores.component.scss']
})
export class TagsStoresComponent implements OnInit, AfterContentInit {

  tags$: Observable<any>;
  isLoading$: Observable<boolean>;
  searchParams: string;

  // pagination for the searched products
  numberProductsFetch = 5;
  stateSeeMore = 0;
  stateBtnPage = 1;
  btnPageOne = 1;
  btnPageTwo = 2;
  btnPageThree = 3;
  stateBtnOne = true;
  stateBtnTwo = false;
  stateBtnThree = false;

  constructor(
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.windowService.loadingTrue();
    this.tags$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.tagsService.getOneTagStore(params.id, this.stateSeeMore);
      })
    );
  }

  ngAfterContentInit(): void {
    this.windowService.loadingTrue();
    this.tags$.subscribe((tags: any) => {
      this.windowService.loadingFalse();
      if (tags.status === '402') {
        this.openSnackBar(tags.message);
      }
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  // pagination for the searched products --init--

  paginationNext() {
    this.btnPageOne += 1;
    this.btnPageTwo += 1;
    this.btnPageThree += 1;
    this.changeStatePage();
  }

  paginationPrevious() {
    this.changeStatePage();
    if (this.btnPageOne === 1) {
      return;
    }
    this.btnPageOne -= 1;
    this.btnPageTwo -= 1;
    this.btnPageThree -= 1;
    this.changeStatePage();
  }

  btnOne() {
    if (this.btnPageOne === 1) {
      this.stateSeeMore = 0;
    }
    if (this.btnPageOne !== 1) {
      this.stateSeeMore = this.numberProductsFetch * (this.btnPageOne - 1);
    }
    this.windowService.loadingTrue();
    this.tags$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        this.windowService.loadingFalse();
        this.searchParams = params.name;
        return this.tagsService.getOneTagStore(params.id, this.stateSeeMore);
      })
    );
    this.stateBtnPage = this.btnPageOne;
    this.changeStatePage();
  }

  btnTwo() {
    this.stateSeeMore = this.numberProductsFetch * (this.btnPageTwo - 1);
    this.windowService.loadingTrue();
    this.tags$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        this.windowService.loadingFalse();
        this.searchParams = params.name;
        return this.tagsService.getOneTagStore(params.id, this.stateSeeMore);
      })
    );
    this.stateBtnPage = this.btnPageTwo;
    this.changeStatePage();
  }

  btnThree() {
    this.stateSeeMore = this.numberProductsFetch * (this.btnPageThree - 1);
    this.windowService.loadingTrue();
    this.tags$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        this.windowService.loadingFalse();
        this.searchParams = params.name;
        return this.tagsService.getOneTagStore(params.id, this.stateSeeMore);
      })
    );
    this.stateBtnPage = this.btnPageThree;
    this.changeStatePage();
  }

  changeStatePage() {
    if (this.stateBtnPage === this.btnPageOne) {
      this.stateBtnOne = true;
      this.stateBtnTwo = false;
      this.stateBtnThree = false;
    }

    if (this.stateBtnPage === this.btnPageTwo) {
      this.stateBtnOne = false;
      this.stateBtnTwo = true;
      this.stateBtnThree = false;
    }

    if (this.stateBtnPage === this.btnPageThree) {
      this.stateBtnOne = false;
      this.stateBtnTwo = false;
      this.stateBtnThree = true;
    }

    if (this.stateBtnPage !== this.btnPageOne &&
      this.stateBtnPage !== this.btnPageTwo &&
      this.stateBtnPage !== this.btnPageThree) {
        this.stateBtnOne = false;
        this.stateBtnTwo = false;
        this.stateBtnThree = false;
    }
  }

  // pagination for the searched products --final--

}
