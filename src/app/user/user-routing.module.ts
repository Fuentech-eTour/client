import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AddressComponent } from './components/address/address.component';
import { SettingComponent } from './components/setting/setting.component';
import { SavedListsComponent } from './components/saved-lists/saved-lists.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';


const routes: Routes = [{
  path: '',
  component: NavComponent,
  children: [
    {
      path: 'savedlists',
      component: SavedListsComponent
    },
    {
      path: 'address',
      component: AddressComponent
    },
    {
      path: 'orders',
      component: OrdersComponent
    },
    {
      path: 'orders/detail/:id',
      component: PurchaseDetailComponent
    },
    {
      path: 'subscriptions',
      component: SubscriptionsComponent
    },
    {
      path: 'setting',
      component: SettingComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
