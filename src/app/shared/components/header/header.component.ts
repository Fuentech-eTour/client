import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddressOptionsComponent } from '../address-options/address-options.component';

import { map } from 'rxjs/operators';

import { AddProduct } from '../../../core/models/addProduct.model';
import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';

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
  showFiller = false;
  matBageShow$: Observable<boolean>;
  installEvent;
  userName: string = localStorage.getItem('user_name');
  stateIconMenu = false;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
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
  }

  ngOnInit() {
  }

  toggleSideBar() {
    this.cartService.sideBarToggler();
  }

  toggleSideBarIzq() {
    this.cartService.sideBarTogglerIzq();
  }

  showIconMenu() {
    this.stateIconMenu = !this.stateIconMenu;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressOptionsComponent, {
      width: '550px',
      // data: {name: this.isLinear, animal: this.isLinear}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
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
