import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { CreateUserStoreComponent } from './components/create-user-store/create-user-store.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { TagsComponent } from './components/tags/tags.component';
import { StoresComponent } from './components/stores/stores.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { UsersStoreComponent } from './components/users-store/users-store.component';
import { DetailStoreComponent } from './components/detail-store/detail-store.component';
import { EditUserStoreComponent } from './components/edit-user-store/edit-user-store.component';


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
    {
      path: 'stores/users/:id/:razonsocial',
      component: UsersStoreComponent
    },
    {
      path: 'stores/users/:id/:razonsocial/edituserstore/:iduser',
      component: EditUserStoreComponent
    },
    {
      path: 'stores/detail/:id',
      component: DetailStoreComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
