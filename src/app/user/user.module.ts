import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { AddressComponent, EditAddressComponent } from './components/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SettingComponent } from './components/setting/setting.component';
import { SavedListsComponent } from './components/saved-lists/saved-lists.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductModule } from '../product/product.module';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';


@NgModule({
  declarations: [
    NavComponent,
    AddressComponent,
    EditAddressComponent,
    SettingComponent,
    SavedListsComponent,
    SubscriptionsComponent,
    OrdersComponent,
    PurchaseDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ScrollingModule,
    ProductModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
   ]
})
export class UserModule { }
