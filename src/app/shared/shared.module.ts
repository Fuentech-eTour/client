import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';

import { MaterialModule } from './../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MoreContentPipe } from './pipes/more-content/more-content.pipe';
import { FirstWordPipe } from './pipes/first-word/first-word.pipe';
import { CountProductsComponent } from './components/count-products/count-products.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddressOptionsComponent } from './components/address-options/address-options.component';
import { NavMovilComponent } from './components/nav-movil/nav-movil.component';
import { BtnAddCountComponent } from './components/btn-add-count/btn-add-count.component';

@NgModule({
  declarations: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
    MoreContentPipe,
    FirstWordPipe,
    CartComponent,
    CountProductsComponent,
    SidenavComponent,
    AddressOptionsComponent,
    NavMovilComponent,
    BtnAddCountComponent,
  ],
  exports: [
    ExponentialPipe,
    HighlightDirective,
    HeaderComponent,
    FooterComponent,
    MoreContentPipe,
    FirstWordPipe,
    CartComponent,
    SidenavComponent,
    NavMovilComponent,
    BtnAddCountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
