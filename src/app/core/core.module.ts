import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsService } from './services/products/products.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { StoresService } from './services/stores.service';
import { TagsService } from './services/tags.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsersService } from './services/users.service';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProductsService,
    AuthService,
    CartService,
    OrderService,
    StoresService,
    TagsService,
    TokenInterceptorService,
    UsersService,
    WindowService
  ]
})
export class CoreModule { }
