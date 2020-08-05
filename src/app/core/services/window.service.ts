import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  isLoadingNow = false;

  private windowWidth = new BehaviorSubject<any>(document.body.clientWidth);
  private userName = new BehaviorSubject<any>(localStorage.getItem('user_name')?.split(' ')[0]);
  private isloading = new BehaviorSubject<boolean>(false);

  isloading$ = this.isloading.asObservable();
  userName$ = this.userName.asObservable();
  windowWidth$ = this.windowWidth.asObservable();

  constructor(
    private authService: AuthService
  ) {
    window.addEventListener('resize', onresize);
  }

  loadingTrue() {
    this.isLoadingNow = true;
    this.isloading.next(this.isLoadingNow);
  }

  loadingFalse() {
    this.isLoadingNow = false;
    this.isloading.next(this.isLoadingNow);
  }

  onresize(e: any): void {
    const width = e.target.outerWidth;
    const height = e.target.outerHeight;
 }

  addUserName(value) {
    this.userName.next(value);
 }

}
