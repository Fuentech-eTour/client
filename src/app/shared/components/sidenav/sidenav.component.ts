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

  @Input() mostrar2: any;

  constructor(
    private tagsService: TagsService,
  ) { }

  ngOnInit(): void {
    this.fetchTagsProducts();
    this.fetchTagsStores();
  }

  fetchTagsProducts() {
    this.tagsService.getAllTagsProducts()
    .subscribe(tags => {
      this.tagsProducts = tags;
    });
  }

  fetchTagsStores() {
    this.tagsService.getAllTagsStores()
    .subscribe(tags => {
      this.tagsStores = tags;
    });
  }

}
