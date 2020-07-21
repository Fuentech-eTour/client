import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AddressComponent } from '../address/address.component';
import { AddProduct } from '../../../core/models/addProduct.model';
import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';

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
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  displayedColumns: string[] = ['imagen', 'nombre', 'cantidad', 'total'];

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  ngOnInit() {
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
      data: {name: this.isLinear, animal: this.isLinear}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

/* @Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html'
})
export class OrderAddressComponent {

  constructor(
    public dialogRef: MatDialogRef<OrderAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
} */
