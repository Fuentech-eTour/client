import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private windowWidth = new BehaviorSubject<any>(document.body.clientWidth);
  private userName = new BehaviorSubject<any>(localStorage.getItem('user_name')?.split(' ')[0]);
  private isloading = new BehaviorSubject<boolean>(false);
  private stateDisplayFooter = new BehaviorSubject<boolean>(false);
  private stateDisplayHeader = new BehaviorSubject<boolean>(false);
  private session = new BehaviorSubject<string>(localStorage.getItem('session'));
  private idClient = new BehaviorSubject<number>(parseInt(localStorage.getItem('idClient'), 10));

  isloading$ = this.isloading.asObservable();
  stateDisplayFooter$ = this.stateDisplayFooter.asObservable();
  stateDisplayHeader$ = this.stateDisplayHeader.asObservable();
  userName$ = this.userName.asObservable();
  windowWidth$ = this.windowWidth.asObservable();
  session$ = this.session.asObservable();
  idClient$ = this.idClient.asObservable();

  constructor(
    private router: Router,
  ) {
    window.addEventListener('resize', onresize);
  }

  loadingTrue() {
    this.isloading.next(true);
  }

  loadingFalse() {
    this.isloading.next(false);
  }

  stateFooterTrue() {
    if (this.router.url === '/home') {
      this.stateDisplayFooter.next(true);
    }
  }

  stateFooterFalse() {
    this.stateDisplayFooter.next(false);
  }

  stateHeaderTrue() {
    this.stateDisplayHeader.next(true);
  }

  stateHeaderFalse() {
    this.stateDisplayHeader.next(false);
  }

  onResize(width: any): any {
    this.windowWidth.next(width);
 }

  addUserName(value) {
    this.userName.next(value);
 }

 stateSession(state: string) {
   this.session.next(state);
 }

 addIdClient(id: number) {
    this.idClient.next(id);
 }

}
