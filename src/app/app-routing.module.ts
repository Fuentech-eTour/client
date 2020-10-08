import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './admin.guard';
import { AdminStoreGuard } from './shared/guards/admin-store.guard';
import { SuperAdminGuard } from './shared/guards/super-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./stores/stores.module').then(m => m.StoresModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'order',
        canActivate: [ AdminGuard ],
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'demo',
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [ AdminStoreGuard ],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    canActivate: [ AdminGuard ],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'super-admin',
    canActivate: [ SuperAdminGuard ],
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

const routerOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
