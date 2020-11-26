import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AddressComponent } from './components/address/address.component';
import { SettingComponent } from './components/setting/setting.component';
import { SavedListsComponent } from './components/saved-lists/saved-lists.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PurchaseDetailContainer } from './containers/purchase-detail/purchase-detail.container';
import { PurchasesDetailsContainer } from './containers/purchases-details/purchases-details.container';


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
      component: PurchaseDetailContainer
    },
    {
      path: 'orders/purchasesdetails',
      component: PurchasesDetailsContainer
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
