import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { WindowService } from './window.service';
import { StoresService } from './stores.service';
import { ProductsService } from './products/products.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private windowService: WindowService,
    private storesService: StoresService,
    private productsService: ProductsService,
  ) { }

  createUser(user: JSON) {
    return this.http.post(`${environment.url_api}/users/create`, user);
  }

  login(user: JSON) {
    return this.http.post(`${environment.url_api}/users/login`, user);
  }

  loginUserStore(user: JSON) {
    return this.http.post(`${environment.url_api}/users/loginstore`, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedInStore() {
    return !!localStorage.getItem('idstore');
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('idstore');
    localStorage.setItem('session', '');
    this.windowService.stateSession('');
    this.windowService.addUserName(null);
    this.storesService.stateFavoriteStore([]);
    this.productsService.stateFavoriteProducts([]);
    this.router.navigate(['/stores']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserName() {
    return localStorage.getItem('user_name');
  }

  getIdStore() {
    return localStorage.getItem('idstore');
  }
}
