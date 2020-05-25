import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // private af: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
  ) { }

  /* createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.af.auth.signOut();
  }

  hasUser() {
    return this.af.authState;
  } */

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
    this.router.navigate(['/products']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
