import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { LoginUserStoreComponent } from './components/login-user-store/login-user-store.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginUserStoreComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
