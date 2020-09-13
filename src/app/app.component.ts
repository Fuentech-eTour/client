import { Component, OnInit, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { WindowService } from '@core/services/window.service';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';

interface Token {
  token: string;
}

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private tokensCollections: AngularFirestoreCollection<Token>;

  constructor(
    private swUpdate: SwUpdate,
    private messaging: AngularFireMessaging,
    private database: AngularFirestore,
    private windowService: WindowService,
    private authService: AuthService,
    private orderService: OrderService,
  ) {
    this.tokensCollections = this.database.collection<Token>('tokens');
  }

  ngOnInit() {
    this.updatePWA();
    // this.requestPermission();
    // this.listenNotifications();
    if (!localStorage.getItem('session')) {
      localStorage.setItem('session', '');
    }
    if (localStorage.getItem('session')) {
      if (localStorage.getItem('session') === 'isClient') {
        this.authService.refreshToken().subscribe((res: any) => {
          if (res.status === 'UPDATED') {
            this.orderService.joinUser();
          }
        });
      }
    }
  }

  updatePWA() {
    this.swUpdate.available
    .subscribe(value => {
      window.location.reload();
    });
  }

  requestPermission() {
    this.messaging.requestToken
    .subscribe(token => {
      this.tokensCollections.add({token});
    });
  }

  listenNotifications() {
    this.messaging.messages
    .subscribe(message => {});
  }

  @HostListener('window:resize', ['$event'])
  handleKeyDown(event: any) {
    this.windowService.onResize(document.body.clientWidth);
  }
}
