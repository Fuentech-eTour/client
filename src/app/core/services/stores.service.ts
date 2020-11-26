import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Store } from '../models/store.model';
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
  private userStore = new BehaviorSubject<any[]>([]);
  userStore$ = this.userStore.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getAllStores() {
    return this.http.get<Store[]>(`${environment.url_api}/stores/obtenerstores`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllStoresWithProduct(newPage: number) {
    return this.http.post(`${environment.url_api}/products/obtenerproducts`, { cnt: newPage, limitt: 5, cnp: 0, limitp: 10 })
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getOneStores(id: number) {
    return this.http.get<any>(`${environment.url_api}/stores/obtenerstoresid/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  updateOneStores(idstore: number, data: object) {
    return this.http.put(`${environment.url_api}/stores/actualizarstore/${idstore}`, data)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  inactivateStore(idstore: number) {
    return this.http.put(`${environment.url_api}/stores/inactivarstore/${idstore}`, { estado: 0 })
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  assingConfigStore(idstore: number, config: object) {
    return this.http.post(`${environment.url_api}/stores/asignarconfiguracion/${idstore}`, config)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getConfigStoreById(id: number) {
    return this.http.get<any>(`${environment.url_api}/stores/obtenerconfigstore/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  updateConfigStore(idconfig: number, config: object) {
    return this.http.put(`${environment.url_api}/stores/actualizaconfiguracion/${idconfig}`, config)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getConfigBusinessHours(idstore: number) {
    return this.http.get(`${environment.url_api}/stores/obtenerconfigdiasbystoreid/${idstore}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createConfigBusinessHours(config: object) {
    return this.http.post(`${environment.url_api}/stores/creaconfiguraciondias`, config)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  updateConfigBusinessHours(idConfig: number, config: object) {
    return this.http.put(`${environment.url_api}/stores/actualizaconfigdias/${idConfig}`, config)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAvailabilityStoreById(id: number) {
    return this.http.get<any>(`${environment.url_api}/stores/obtenerdispotienda/${id}`)
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

  getStoreByName(name: string, newPage: number) {
    return this.http.post(`${environment.url_api}/products/obtenerproductsbystorename/${name}`,
    { cnt: newPage, limitt: 5, cnp: 0, limitp: 10 })
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

  assingTagStore(idstore: number, idtag: number) {
    return this.http.post(`${environment.url_api}/stores/asignatagstore`, { idstore, idtag })
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  editTagStore(newTag: object) {
    return this.http.put(`${environment.url_api}/stores/modificatagStore`, newTag)
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

  addQualificationStore(idstore: number, quantity: number) {
    return this.http.post(`${environment.url_api}/stores/agregarpuntuacion`, { idtienda: idstore, puntuacion: quantity })
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getQualificationStore(idstore: number) {
    return this.http.get<any>(`${environment.url_api}/stores/obtenerpuntuaciontienda/${idstore}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getUsersStore(idstore: number) {
    return this.http.get<any>(`${environment.url_api}/users/obtenerusuariosportienda/${idstore}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  editUserStoreBySuperAdmin(id: number, data: object) {
    return this.http.put(`${environment.url_api}/users/updateuserStoreBySuperAdmin/${id}`, data)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  dataUserStore(userStore: any) {
    this.userStore.next(userStore);
  }

  // captura los errores de peticiones a servicios y los envia a Sentry --init--//
  private handleError(error: HttpErrorResponse) {
    Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
  // captura los errores de peticiones a servicios y los envia a Sentry --final--//
}
