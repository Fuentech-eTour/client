import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { StoresModule } from '../stores/stores.module';
import { ProductModule } from '../product/product.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';


@NgModule({
  declarations: [SearchComponent, HomeSearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    SharedModule,
    StoresModule,
    ProductModule,
  ]
})
export class SearchModule { }
