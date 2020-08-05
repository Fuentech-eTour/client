import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TagsService } from '@core/services/tags.service';
import { WindowService } from '@core/services/window.service';

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
    this.tags$.subscribe(tags => {
      if (tags.length !== 0) {
        this.windowService.loadingFalse();
      }
    });
  }

}
