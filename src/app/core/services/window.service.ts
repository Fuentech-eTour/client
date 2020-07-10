import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private windowWidth = new BehaviorSubject<any>(document.body.clientWidth);

  windowWidth$ = this.windowWidth.asObservable();

  constructor() {
    window.addEventListener('resize', onresize);
  }

  onresize(e: any): void {
    const width = e.target.outerWidth;
    const height = e.target.outerHeight;
 }

}
