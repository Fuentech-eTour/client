import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import * as Sentry from '@sentry/browser';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  socket: any;

  constructor(
    private http: HttpClient,
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

  // Metodos protocolo Websocket --init--

  public newOrders$() {
    return new Observable(observer => {
      try {
        const minerSocket = webSocket(environment.serverSocket);
        minerSocket.subscribe((d) =>
          console.log(':::webSocket Order arrived'),
          (err) => console.warn(':::webSocket Order DIDNOT arrived'),
          () => console.log(':::webSocket COMPLETED')
        );

        this.socket.on('connection', () => {
          console.log('WS: Connected');
        });

        this.socket.on('order', ( data ) => {
          observer.next( data );
        });

        this.socket.emit('join', {token: this.authService.getToken()});

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

  public stateOrder$() {
    return new Observable(observer => {
      try {
        const minerSocket = webSocket(environment.serverSocket);
        minerSocket.subscribe((d) =>
          console.log(':::webSocket StateOrder arrived'),
          (err) => console.warn(':::webSocket StateOrder DIDNOT arrived'),
          () => console.log(':::webSocket COMPLETED')
        );

        this.socket.on('connection', () => {
          console.log('WS: Connected');
        });

        this.socket.on('stateOrder', ( data ) => {
          observer.next( data );
        });

        if (this.authService.getToken()) {
          this.socket.emit('join', {token: this.authService.getToken()});
        }

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

  public emitNewOrder(data: any) {
    this.socket.emit('order', data);
  }

  public emitStateOrder(data: any) {
    this.socket.emit('stateOrder', data);
  }

  // Metodos protocolo Websocket --final--

  // Metodos protocolo HTTP --init--

  createSells(stores: [], idAddress: number) {
    return this.http.post(`${environment.url_api}/sells/crearventa`, { objventa: stores, iddir:  idAddress})
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getSellsByOneStore() {
    return this.http.get<any>(`${environment.url_api}/sells/obtenerventasbystore/${localStorage.getItem('idstore')}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getShoppingByOneStore() {
    return this.http.get<any>(`${environment.url_api}/sells/obtenernocomprasbystore/${localStorage.getItem('idstore')}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getOneSellById(id: number) {
    return this.http.get<any>(`${environment.url_api}/sells/obtenerventaunitaria/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  confirmSell(id: number) {
    return this.http.put<any>(`${environment.url_api}/sells/confirmacompra/${id}`, {})
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  // captura los errores de peticiones a servicios y los envia a Sentry --init--//
  private handleError(error: HttpErrorResponse) {
    Sentry.captureException(error);
    return throwError('ups algo salio mal');
  }
  // captura los errores de peticiones a servicios y los envia a Sentry --final--//

  // Metodos protocolo HTTP --final--
}
