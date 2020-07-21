import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private windowWidth = new BehaviorSubject<any>(document.body.clientWidth);
  private userName = new BehaviorSubject<any>(localStorage.getItem('user_name')?.split(' ')[0]);

  userName$ = this.userName.asObservable();

  windowWidth$ = this.windowWidth.asObservable();

  constructor(
    private authService: AuthService
  ) {
    window.addEventListener('resize', onresize);
  }

  onresize(e: any): void {
    const width = e.target.outerWidth;
    const height = e.target.outerHeight;
 }

 addUserName(value) {
  this.userName.next(value);
 }

}
