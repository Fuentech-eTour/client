import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  isLoadingNow: boolean;
  stateDisplayFooterNow = false;
  stateDisplayHeaderNow = false;

  private windowWidth = new BehaviorSubject<any>(document.body.clientWidth);
  private userName = new BehaviorSubject<any>(localStorage.getItem('user_name')?.split(' ')[0]);
  private isloading = new BehaviorSubject<boolean>(false);
  private stateDisplayFooter = new BehaviorSubject<boolean>(false);
  private stateDisplayHeader = new BehaviorSubject<boolean>(false);

  isloading$ = this.isloading.asObservable();
  stateDisplayFooter$ = this.stateDisplayFooter.asObservable();
  stateDisplayHeader$ = this.stateDisplayHeader.asObservable();
  userName$ = this.userName.asObservable();
  windowWidth$ = this.windowWidth.asObservable();

  constructor(
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

  stateFooterTrue() {
    this.stateDisplayFooterNow = true;
    this.stateDisplayFooter.next(this.stateDisplayFooterNow);
  }

  stateFooterFalse() {
    this.stateDisplayFooterNow = false;
    this.stateDisplayFooter.next(this.stateDisplayFooterNow);
  }

  stateHeaderTrue() {
    this.stateDisplayHeader.next(true);
  }

  stateHeaderFalse() {
    this.stateDisplayHeader.next(false);
  }

  onResize(width: any): any {
    console.log(width);
    this.windowWidth.next(width);
 }

  addUserName(value) {
    this.userName.next(value);
 }

}
