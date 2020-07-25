import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TagsService } from '@core/services/tags.service';

@Component({
  selector: 'app-tags-products',
  templateUrl: './tags-products.component.html',
  styleUrls: ['./tags-products.component.scss']
})
export class TagsProductsComponent implements OnInit {

  tags$: Observable<any>;

  constructor(
    private tagsService: TagsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tags$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.tagsService.getOneTag(params.id);
      })
    );
  }

}
