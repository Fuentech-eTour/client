import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { CreateUserStoreComponent } from './components/create-user-store/create-user-store.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { TagsComponent } from './components/tags/tags.component';
import { StoresComponent } from './components/stores/stores.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';


const routes: Routes = [{
  path: '',
  component: NavComponent,
  children: [
    {
      path: 'create-user-store',
      component: CreateUserStoreComponent
    },
    {
      path: 'create-store',
      component: CreateStoreComponent
    },
    {
      path: 'tags',
      component: TagsComponent
    },
    {
      path: 'stores',
      component: StoresComponent
    },
    {
      path: 'stores/edit/:id',
      component: EditStoreComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
