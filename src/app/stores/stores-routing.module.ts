import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  {
    path: '',
    component: StoresComponent
  },
  {
    path: ':id',
    component: StoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
