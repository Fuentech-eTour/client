import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { AddressComponent } from './components/address/address.component';

import { MaterialModule } from '../material/material.module';
import { SettingComponent } from './components/setting/setting.component';
import { SavedListsComponent } from './components/saved-lists/saved-lists.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [NavComponent, AddressComponent, SettingComponent, SavedListsComponent, SubscriptionsComponent, OrdersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
  ]
})
export class UserModule { }
