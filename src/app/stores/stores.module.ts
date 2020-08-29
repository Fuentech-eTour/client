import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/store/store.component';

import { ProductModule } from '../product/product.module';
import { BannerStoresComponent } from './components/banner-stores/banner-stores.component';
import { MaterialModule } from '../material/material.module';
import { ProductStoreComponent } from './components/product-store/product-store.component';
import { SidebarStoreComponent } from './components/sidebar-store/sidebar-store.component';
import { SharedModule } from '../shared/shared.module';
import { ProductStoreMovilComponent } from './components/product-store-movil/product-store-movil.component';
import { TagsProductsComponent } from './components/tags-products/tags-products.component';
import { SearchStoresComponent } from './components/search-stores/search-stores.component';
import { TagsStoresComponent } from './components/tags-stores/tags-stores.component';
import { CommentsStoreComponent } from './components/comments-store/comments-store.component';


@NgModule({
  declarations: [
    StoresComponent,
    StoreComponent,
    BannerStoresComponent,
    ProductStoreComponent,
    SidebarStoreComponent,
    ProductStoreMovilComponent,
    TagsProductsComponent,
    SearchStoresComponent,
    TagsStoresComponent,
    CommentsStoreComponent,
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    ProductModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    StoresComponent,
    StoreComponent,
    BannerStoresComponent,
    ProductStoreComponent,
    SidebarStoreComponent,
    ProductStoreMovilComponent,
    TagsProductsComponent,
    SearchStoresComponent,
    TagsStoresComponent,
  ]
})
export class StoresModule { }
