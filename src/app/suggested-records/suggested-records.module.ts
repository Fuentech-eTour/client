import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestedRecordsRoutingModule } from './suggested-records-routing.module';
import { SuggestedStoreRegistrationComponent } from './components/suggested-store-registration/suggested-store-registration.component';
import { SuggestedUserRegistrationComponent } from './components/suggested-user-registration/suggested-user-registration.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "@material/material.module";
import { OptionsModalComponent } from './components/options-modal/options-modal.component';
import { CreateUserStoreComponent } from './components/create-user-store/create-user-store.component';
import { InstructionsStoreComponent } from './components/instructions-store/instructions-store.component';


@NgModule({
  declarations: [SuggestedStoreRegistrationComponent, SuggestedUserRegistrationComponent, OptionsModalComponent, CreateUserStoreComponent, InstructionsStoreComponent],
  imports: [
    CommonModule,
    SuggestedRecordsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SuggestedRecordsModule { }
