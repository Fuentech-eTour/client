import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { BannerGifsComponent } from './components/banner-gifs/banner-gifs.component';

@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent,
        SubscriptionPlansComponent,
        BannerGifsComponent,
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        SharedModule,
        MaterialModule,
    ]
})
export class HomeModule { }
