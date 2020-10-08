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
        return this.tagsService.getOneTagStore(params.id);
      })
    );
  }

  ngAfterContentInit(): void {
    this.windowService.loadingTrue();
    this.tags$.subscribe((tags: any) => {
      console.log(tags);
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

}
