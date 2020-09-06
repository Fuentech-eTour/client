import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AddressComponent } from '../address/address.component';
import { AddProduct } from '../../../core/models/addProduct.model';
import { UsersService } from '@core/services/users.service';
import { UtilityService } from '@core/services/utility.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<AddProduct[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private addresses = new BehaviorSubject<any>([]);
  addresses$ = this.addresses.asObservable();
  token: string;
  isLinear = true;
  displayedColumns: string[] = ['imagen', 'nombre', 'cantidad', 'total'];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {
    this.products$ = this.cartService.cart$;
    this.token = this.authService.getToken();
    this.buildForm();
  }

  ngOnInit() {
    this.fetchAllAddress();
  }

  fetchAllAddress() {
    this.usersService.getAllAddress().subscribe(data => {
      this.isloading.next(false);
      this.addresses.next(data);
    });
  }

  selectAddress(address) {
    this.usersService.addSelectAddress(address);
    this.sendOrder();
  }

  buildForm() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['true', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('holaaaaaaaaaaaaaaa');
      this.fetchAllAddress();
    });
  }

  sendOrder() {
    this.orderService.getMiners$().subscribe();
  }

}
