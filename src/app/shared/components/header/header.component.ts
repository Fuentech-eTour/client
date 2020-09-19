import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddressOptionsComponent } from '../address-options/address-options.component';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { AuthService } from '../../../core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { UsersService } from '@core/services/users.service';

import { map } from 'rxjs/operators';

import { AddProduct } from '../../../core/models/addProduct.model';
import { CartService } from './../../../core/services/cart.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() mostrar: any;
  @Input() mostrar2: any;

  total$: Observable<number>;
  contByProduct$: Observable<number[]>;
  totalCompra$: Observable<number>;
  products$: Observable<AddProduct[]>;
  matBageShow$: Observable<boolean>;
  nameUser$: Observable<any>;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  selectAddress$: Observable<any>;
  session$: Observable<any>;
  installEvent;
  showFiller = false;
  stateIconMenu = false;
  rol$: Observable<any>;

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
    this.rol$ = this.windowService.session$;
    this.session$ = this.windowService.session$;
  }

  ngOnInit() {
    this.windowService.isloading$.subscribe(data => {
      this.isLoading.next(data);
    });
    this.usersService.selectAddress$.subscribe(console.log);
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
    this.windowService.addUserName(null);
    this.authService.logout();
  }

  searchStore(value: string) {
    if (value !== '') {
      this.router.navigate(['/search', value]);
    } else {
      this.router.navigate(['/stores']);
    }
  }

  toPerfil() {
    const idStore = this.authService.getIdStore();
    console.log(idStore);
    if (idStore === undefined || idStore === null) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/admin']);
    }
  }

  openSearch() {
    this.windowService.stateHeaderTrue();
  }

  @HostListener('window: beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    console.log(event);
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
