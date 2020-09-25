import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CreateUserStoreComponent } from './components/create-user-store/create-user-store.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { TagsComponent, EditTagComponent } from './components/tags/tags.component';
import { AssingCategoryComponent } from './components/assing-category/assing-category.component';
import { StoresComponent } from './components/stores/stores.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { UsersStoreComponent } from './components/users-store/users-store.component';
import { DetailStoreComponent } from './components/detail-store/detail-store.component';
import { EditUserStoreComponent } from './components/edit-user-store/edit-user-store.component';


@NgModule({
  declarations: [
    NavComponent,
    CreateUserStoreComponent,
    CreateStoreComponent,
    TagsComponent,
    EditTagComponent,
    AssingCategoryComponent,
    StoresComponent,
    EditStoreComponent,
    MessageModalComponent,
    UsersStoreComponent,
    DetailStoreComponent,
    EditUserStoreComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SuperAdminModule { }
