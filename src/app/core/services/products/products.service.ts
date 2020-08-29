import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';

import { environment } from '../../../../environments/environment';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsFavorite: any[];
  private favoriteProducts = new BehaviorSubject<any[]>([]);
  favoriteProducts$ = this.favoriteProducts.asObservable();

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

  getAllProductsByTags() {
    return this.http.get<Product[]>(`${environment.url_api}/products/obtenerProductoalltagsid`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProductsByStore(id: number) {
    return this.http.get<Product[]>(`${environment.url_api}/products/obtenerproductsbystoreid/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.url_api}/products/obtenerproductbyid/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProductByName(name: string) {
    return this.http.get<any>(`${environment.url_api}/products/obtenerproductbyname/${name}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products/crearproduct`, product)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  updateProduct(id: number, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/actualizaproduct`, changes)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  deleteProduct(code: object) {
    console.log(code);
    return this.http.put(`${environment.url_api}/products/inactivaproduct`, code)
    .pipe(
      retry(3), // hace la petición al servicio tres veces
      catchError(this.handleError), // si la petición no se consigue manda el error a handleError()
    );
  }

  addTagProduct(idp: number, idt: object) {
    return this.http.post(`${environment.url_api}/products/asignartagproducto/${idp}`, idt)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createFavoritiesProducts(idproducto: object) {
    console.log(idproducto);
    return this.http.post(`${environment.url_api}/favs/agregaproductofavs`, idproducto)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getFavoriteProducts() {
    return this.http.get<any>(`${environment.url_api}/favs/obtenerproductosfavoritos`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  stateFavoriteProducts(products: any) {
    console.log(products);
    this.favoriteProducts.next(products);
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
