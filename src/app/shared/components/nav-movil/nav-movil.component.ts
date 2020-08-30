import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddressOptionsComponent } from '../address-options/address-options.component';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { RegisterComponent } from '../../../auth/components/register/register.component';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';

import { map } from 'rxjs/operators';

import { AddProduct } from '../../../core/models/addProduct.model';
import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-movil',
  templateUrl: './nav-movil.component.html',
  styleUrls: ['./nav-movil.component.scss']
})
export class NavMovilComponent implements OnInit {

  @Input() mostrar: any;
  @Input() mostrar2: any;

  total$: Observable<number>;
  contByProduct$: Observable<number[]>;
  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  showFiller = false;
  matBageShow$: Observable<boolean>;
  installEvent;
  stateIconMenu = false;
  nameUser$: Observable<any>;
  rol$: Observable<any>;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private authService: AuthService,
    private windowService: WindowService,
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
    this.rol$ = this.windowService.session$;
  }

  ngOnInit() {
  }

  showIconMenu() {
    this.stateIconMenu = !this.stateIconMenu;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressOptionsComponent, {
      width: '550px',
    });
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.authService.logout();
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
