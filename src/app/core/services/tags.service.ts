import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllTagsProducts() {
    return this.http.get<any>(`${environment.url_api}/tags/obtenertags`)
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getAllTagsStores() {
    return this.http.get<any>(`${environment.url_api}/tags/obtenertagsstores`)
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getOneTag(id: number) {
    return this.http.get<any>(`${environment.url_api}/products/obtenerproductotagid/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getOneTagStore(id: number) {
    return this.http.get<any>(`${environment.url_api}/products/obtenerproductsbystoretagidall/${id}`)
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