import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireMessagingModule } from 'angularfire2/messaging';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from './../environments/environment';
import { AdminGuard } from './admin.guard';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { OrderService } from '@core/services/order.service';

// usar solo en produccion --init-- //
import * as Sentry from '@sentry/browser';
import { ServiceWorkerModule } from '@angular/service-worker';

/* Sentry.init({
  dsn: 'https://31fa6721aa294e12b316eb64c1edd21b@o375175.ingest.sentry.io/5194223'
}); */
// usar solo en produccion --final-- //

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    MatSidenavModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
