import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';


const routes: Routes = [
  {
    path: '',
    component: HomeSearchComponent
  },
  {
    path: ':name',
    component: SearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
