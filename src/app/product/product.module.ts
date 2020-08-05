import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../material/material.module';
import { BannerProductsComponent } from './components/banner-products/banner-products.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CounterProductsComponent } from './components/counter-products/counter-products.component';
import { ProductMovilComponent } from './components/product-movil/product-movil.component';

@NgModule({
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductsComponent,
        BannerProductsComponent,
        CounterProductsComponent,
        ProductMovilComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProductRoutingModule,
        MaterialModule,
        LayoutModule,
    ],
    exports: [
        ProductComponent,
        CounterProductsComponent,
        BannerProductsComponent
    ]
})
export class ProductModule {}
