import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserStoreComponent } from './components/create-user-store/create-user-store.component';
import { InstructionsStoreComponent } from './components/instructions-store/instructions-store.component';
import { SuggestedStoreRegistrationComponent } from './components/suggested-store-registration/suggested-store-registration.component';
import { SuggestedUserRegistrationComponent } from './components/suggested-user-registration/suggested-user-registration.component';


const routes: Routes = [
  {
    path: 'store/:name',
    component: SuggestedStoreRegistrationComponent
  },
  {
    path: 'store/create-user/:token',
    component: CreateUserStoreComponent
  },
  {
    path: 'store/instructions/create-user-store',
    component: InstructionsStoreComponent
  },
  {
    path: 'user/:name',
    component: SuggestedUserRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestedRecordsRoutingModule { }
