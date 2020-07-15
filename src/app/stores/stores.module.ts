import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/store/store.component';

import { ProductModule } from '../product/product.module';
import { BannerStoresComponent } from './components/banner-stores/banner-stores.component';
import { MaterialModule } from '../material/material.module';
import { ProductStoreComponent } from './components/product-store/product-store.component';
import { SidebarStoreComponent } from './components/sidebar-store/sidebar-store.component';


@NgModule({
  declarations: [
    StoresComponent,
    StoreComponent,
    BannerStoresComponent,
    ProductStoreComponent,
    SidebarStoreComponent,
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    ProductModule,
    MaterialModule
  ]
})
export class StoresModule { }
