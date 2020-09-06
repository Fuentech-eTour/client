import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  socket: any;

  constructor(
    private authService: AuthService,
  ) {
    this.socket = io(environment.serverSocket, {
      // path: '/',
      secure: true,
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      rejectUnauthorized: false,
      agent: false,
      upgrade: false,
      transports: [ 'websocket' ],
    });
  }

  public getMiners$() {
    return new Observable(observer => {
      try {
        const minerSocket = webSocket(environment.serverSocket);
        minerSocket.subscribe((d) =>
          console.log(':::webSocket Miner arrived'),
          (err) => console.warn(':::webSocket Miner DIDNOT arrived'),
          () => console.log(':::webSocket COMPLETED')
        );

        this.socket.on('connection', (socket) => {
          console.log('WS: Connected', socket.id);
        });

        this.socket.on('message', ( data ) => {
          console.log('WS: Message', data);
          observer.next( data );
        });

        this.socket.on('order', ( data ) => {
          console.log('order', data);
          observer.next( data );
        });

        // this.socket.emit('join', {token: this.authService.getToken()});

        this.socket.on('sala', ( data ) => {
          console.log('WS: Message', data);
          observer.next( data );
        });

        this.socket.on('disconnect', () => {
          console.warn('WS: Disconnected!');
          observer.complete();
        });

        this.socket.on('error', (error) => {
          console.log('WS: Error!');
          observer.error(error);
        });

        this.socket.on('connect_error', (error) => {
          console.log('WS: Connect error');
          observer.error(error);
        });

        return () => {
          console.log('Observable completed!');
          this.socket.disconnect();
        };

      } catch (error) {
        observer.error(error);
      }
    });
  }

  public joinUser() {
    this.socket.emit('join', {token: this.authService.getToken()});
  }

  public emitOrder() {
    this.socket.emit('order', 23);
  }
}
