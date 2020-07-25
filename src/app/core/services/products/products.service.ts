import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';

import { environment } from '../../../../environments/environment';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/obtenertodos`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProductsUser() {
    return this.http.get<Product[]>(`${environment.url_api}/products/user`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  updateProduct(id: number, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.url_api}/products/${id}`)
    .pipe(
      retry(3), // hace la petición al servicio tres veces
      catchError(this.handleError), // si la petición no se consigue manda el error a handleError()
    );
  }

  getFile() {
    return this.http.get('assets/files/test.txt', {responseType: 'text'});
  }

  // captura los errores de peticiones a servicios y los envia a Sentry --init--//
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
  // captura los errores de peticiones a servicios y los envia a Sentry --final--//
}
