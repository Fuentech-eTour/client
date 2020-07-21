import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  createUser(user: JSON) {
    return this.http.post(`${environment.url_api}/users/create`, user);
  }

  login(user: JSON) {
    return this.http.post(`${environment.url_api}/users/login`, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    this.router.navigate(['/stores']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserName() {
    return localStorage.getItem('user_name');
  }
}
