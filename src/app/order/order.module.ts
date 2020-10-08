import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { AddressComponent } from './components/address/address.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';


@NgModule({
  declarations: [OrderComponent, AddressComponent, MessageModalComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class OrderModule { }
