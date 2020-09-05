import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { WindowService } from './window.service';
import { StoresService } from './stores.service';
import { ProductsService } from './products/products.service';
import { tap } from 'rxjs/operators';

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

  refreshToken() {
    return this.http.post(`${environment.url_api}/users/tkenclient`, {refreshToken: this.getRefreshToken()})
    .pipe(tap((res: any) => {
      console.log(res);
      this.setToken(res.data.accessToken);
    }));
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
    return this.http.post(`${environment.url_api}/users/logout`, {refreshToken: this.getRefreshToken()})
      .subscribe((res: any) => {
        if (res.status === '402') {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user_name');
          localStorage.removeItem('idstore');
          localStorage.setItem('session', '');
          localStorage.setItem('idClient', '');
          this.windowService.stateSession('');
          this.windowService.addUserName(null);
          this.windowService.addIdClient(-1);
          this.storesService.stateFavoriteStore([]);
          this.productsService.stateFavoriteProducts([]);
          this.router.navigate(['/stores']);
        }
      });
  }

  private setToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getUserName() {
    return localStorage.getItem('user_name');
  }

  getIdStore() {
    return localStorage.getItem('idstore');
  }
}
