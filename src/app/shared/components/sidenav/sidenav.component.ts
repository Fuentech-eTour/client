import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from '@core/services/tags.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  tagsStores: any;
  tagsProducts: any;
  stateSeeMoreProducts = true;
  newPageProducts = 0;
  stateSeeMoreStores = true;
  newPageStores = 0;

  @Input() mostrar2: any;

  constructor(
    private tagsService: TagsService,
  ) { }

  ngOnInit(): void {
    this.fetchTagsProducts();
    this.fetchTagsStores();
  }

  fetchTagsProducts() {
    this.tagsService.getTagsProductsForPage(this.newPageProducts)
    .subscribe(tags => {
      this.tagsProducts = tags;
    });
  }

  seeMoreTagsProducts() {
    this.newPageProducts += 8;
    this.tagsService.getTagsProductsForPage(this.newPageProducts)
    .subscribe((tags: []) => {
      if (tags.length === 0) {
        return;
      }
      if (tags.length < 8) {
        this.stateSeeMoreProducts = false;
      }
      this.tagsProducts = this.tagsProducts.concat(tags);
    });
  }

  fetchTagsStores() {
    this.tagsService.getTagsStoresForPage(this.newPageStores)
    .subscribe(tags => {
      this.tagsStores = tags;
    });
  }

  seeMoreTagsStores() {
    this.newPageStores += 8;
    this.tagsService.getTagsStoresForPage(this.newPageStores)
    .subscribe((tags: []) => {
      if (tags.length === 0) {
        return;
      }
      if (tags.length < 8) {
        this.stateSeeMoreStores = false;
      }
      this.tagsStores = this.tagsStores.concat(tags);
    });
  }

}
