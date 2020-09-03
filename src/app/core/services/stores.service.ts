import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Store } from '../models/store.model';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  storesFavorite: any[];
  private favoriteStores = new BehaviorSubject<any[]>([]);
  favoriteStores$ = this.favoriteStores.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getAllStores() {
    return this.http.get<Store[]>(`${environment.url_api}/products/obtenerproducts`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProductsOneStore(id: number) {
    return this.http.get<any>(`${environment.url_api}/products/obtenerproductsbystoreid/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getProductsByTagsOneStore(id: number) {
    return this.http.get<any>(`${environment.url_api}/products/obtenerproductostiendasidtags/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getTagsOneStore(id: number) {
    return this.http.get<any>(`${environment.url_api}/stores/obtenertagsstoresbyid/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getStoreByName(name: string) {
    return this.http.get<any>(`${environment.url_api}/products/obtenerproductsbystorename/${name}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createStore(store: any) {
    return this.http.post(`${environment.url_api}/stores/crearstore`, store)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  subscriptionStore(idtienda: object) {
    return this.http.post(`${environment.url_api}/favs/agregatiendafavs`, idtienda)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getStoreFavorite() {
    return this.http.get<any>(`${environment.url_api}/favs/obtenertiendasfavoritas`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  stateFavoriteStore(stores: any) {
    this.favoriteStores.next(stores);
  }

  createCommentStore(idstore: number, comment: object) {
    return this.http.post(`${environment.url_api}/stores/crearcomentario/${idstore}`, comment)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getCommentStore(idstore: number) {
    return this.http.get<any>(`${environment.url_api}/stores/obtenercomentariosstore/${idstore}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  editOrInactivateComment(idComment: number, data: object) {
    return this.http.put(`${environment.url_api}/stores/actualizacomentario/${idComment}`, data)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  // captura los errores de peticiones a servicios y los envia a Sentry --init--//
  private handleError(error: HttpErrorResponse) {
    Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
  // captura los errores de peticiones a servicios y los envia a Sentry --final--//
}
