import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { UsersService } from '@core/services/users.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AddProduct } from '@core/models/addProduct.model';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { OrderService } from '@core/services/order.service';
import { UtilityService } from '@core/services/utility.service';


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
  order$: Observable<any>;
  totalPrice$: Observable<any>;
  address$: Observable<any>;
  order: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private municipality = new BehaviorSubject<any>({});
  municipality$ = this.municipality.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private addresses = new BehaviorSubject<any[]>([]);
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
    private utilityService: UtilityService,
    private router: Router,
  ) {
    this.products$ = this.cartService.cart$;
    this.order$ = this.cartService.order$;
    this.totalPrice$ = this.cartService.precioTotal$;
    this.address$ = this.usersService.selectAddress$;
    this.token = this.authService.getToken();
    this.buildForm();
  }

  ngOnInit() {
    this.fetchAllAddress();
    this.order$.subscribe(data => {
      console.log(data);
      this.order = data;
    });
    this.address$.subscribe(address => {
      console.log(address);
      this.utilityService.getAllMunicipality().subscribe(data => {
        console.log(data);
        const municipalitySelect = data.filter(municipality => municipality.id === address.idutmunicipality);
        console.log(municipalitySelect);
        this.municipality.next(municipalitySelect[0]);
      });
    });
  }

  fetchInfoUser() {
    this.usersService.getInfoUser().subscribe(data => {
      console.log(data);
    });
  }

  selectAddress(address) {
    this.usersService.addSelectAddress(address);
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
      console.log(result);
      this.fetchAllAddress();
    });
  }

  fetchAllAddress() {
    this.usersService.getAllAddress().subscribe(data => {
      console.log(data);
      this.isloading.next(false);
      this.addresses.next(data);
    });
  }

  sendOrder() {
    this.usersService.selectAddress$
      .subscribe((address: any) => {
        console.log(address);
        this.orderService.createSells(this.order, address.id)
          .subscribe(({ status, data }: any) => {
            console.log(status, data);
            if (status === 'OK') {
              this.cartService.resetOrder();
              // tslint:disable-next-line: prefer-for-of
              for (let i = 0; i < data.length; i++) {
                data[i].nameUser = this.authService.getUserName();
                console.log(data);
              }
              this.orderService.emitNewOrder(data);
              this.router.navigate(['/user/orders']);
            }
        });
      });
  }

}
