import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private selectAddress = new BehaviorSubject<any>('');
  selectAddress$ = this.selectAddress.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getInfoUser() {
    return this.http.get<any>(`${environment.url_api}/users/obtenerinfocliente`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  editInfoUser(data: any) {
    return this.http.put(`${environment.url_api}/users/updateClient`, data)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createUserStore(userStore: any) {
    return this.http.post(`${environment.url_api}/users/createustore`, userStore)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createPermisionUserStore(userPermission: any) {
    return this.http.post(`${environment.url_api}/users/createpermisionuserstore/${userPermission.id}`, userPermission)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getAllAddress() {
    return this.http.get<any>(`${environment.url_api}/users/obtenerdirecciones/${1}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  createAddress(newAddress: any) {
    return this.http.post(`${environment.url_api}/users/creardireccionuser/${1}`, newAddress)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  editAddress(iddir: number, address: any) {
    return this.http.put(`${environment.url_api}/users/actualizadireccion/${iddir}`, address)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  deleteAddress(iddir: number, state) {
    return this.http.put(`${environment.url_api}/users/cambiaestadodireccion/${iddir}`, state)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  addSelectAddress(address) {
    this.selectAddress.next(address);
  }

  editPassword(newPassword: object) {
    return this.http.put(`${environment.url_api}/users/cambiaclave`, newPassword)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getRolUser() {
    return this.http.get<any>(`${environment.url_api}/users/obtenerrolusuario`)
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
