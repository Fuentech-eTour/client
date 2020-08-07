import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/store/store.component';
import { TagsProductsComponent } from './components/tags-products/tags-products.component';
import { TagsStoresComponent } from './components/tags-stores/tags-stores.component';
import { SearchStoresComponent } from './components/search-stores/search-stores.component';

const routes: Routes = [
  {
    path: '',
    component: StoresComponent
  },
  {
    path: ':id',
    component: StoreComponent
  },
  {
    path: 'tagsproducts/:id',
    component: TagsProductsComponent
  },
  {
    path: 'tagsstores/:id',
    component: TagsStoresComponent
  },
  {
    path: 'searchstores/:name',
    component: SearchStoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
