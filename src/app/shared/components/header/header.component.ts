import { Component, OnInit, HostListener, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddressOptionsComponent } from '../address-options/address-options.component';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { AuthService } from '../../../core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { UsersService } from '@core/services/users.service';

import { map, delay, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { AddProduct } from '../../../core/models/addProduct.model';
import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() mostrar: any;
  @Input() mostrar2: any;

  total$: Observable<number>;
  contByProduct$: Observable<number[]>;
  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  matBageShow$: Observable<boolean>;
  nameUser$: Observable<any>;
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  selectAddress$: Observable<any>;
  session$: Observable<any>;
  installEvent;
  showFiller = false;
  stateIconMenu = false;
  private rol = new BehaviorSubject<any>('');
  rol$ = this.rol.asObservable();

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private authService: AuthService,
    private windowService: WindowService,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.total$ = this.cartService.numProductsCart$
    .pipe(map(products => products.length));

    this.matBageShow$ = this.cartService.numProductsCart$
    .pipe(map(Products => {if (Products.length > 0) {
      return false;
    } else {
      return true;
    }}));

    this.contByProduct$ = this.cartService.numProductsCart$;
    this.products$ = this.cartService.cart$;
    this.totalCompra$ = this.cartService.precioTotal$;
    this.nameUser$ = this.windowService.userName$;
    this.selectAddress$ = this.usersService.selectAddress$;
    this.session$ = this.windowService.session$;
  }

  ngOnInit() {
    this.windowService.session$.subscribe(data => {
      if (data === null) {
        this.rol.next('');
        return;
      }
      this.rol.next(data);
    });
    this.usersService.selectAddress$.subscribe();
  }

  ngAfterViewInit() {
    this.windowService.isloading$
    .pipe(
      delay(0),
      tap(res => this.isLoading.next(res))
    ).subscribe();
  }


  showIconMenu() {
    this.stateIconMenu = !this.stateIconMenu;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressOptionsComponent, {
      width: 'auto'
    });
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    this.windowService.addUserName(null);
    this.authService.logout();
  }

  searchStore($event: KeyboardEvent, value: any) {
    if ($event.key === 'Enter' && !$event.shiftKey) {
      $event.preventDefault();
      if (value !== '') {
        this.router.navigate(['/search', value]);
      }
    } 
    if ($event.type === 'click') {
      if (value !== '') {
        this.router.navigate(['/search', value]);
      }
    }
  }

  toPerfil() {
    const idStore = this.authService.getIdStore();
    if (idStore === undefined || idStore === null) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/admin/products']);
    }
  }

  openSearch() {
    this.windowService.stateHeaderTrue();
  }

  @HostListener('window: beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser() {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice
      .then(rta => {
        console.log(rta);
      });
    }
  }
}
