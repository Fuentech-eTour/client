import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Store } from '../models/store.model';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStores() {
    return this.http.get<Store[]>(`${environment.url_api}/stores`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProductsOneStore(id: number) {
    return this.http.get<Product[]>(`${environment.url_api}/stores/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createSubscription(store: Store) {
    console.log(store);
    return this.http.post(`${environment.url_api}/stores/subscription`, store)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  // captura los errores de peticiones a servicios y los envia a Sentry --init--//
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
  // captura los errores de peticiones a servicios y los envia a Sentry --final--//
}
