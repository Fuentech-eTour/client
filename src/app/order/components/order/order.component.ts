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
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { InputsModalComponent } from '../inputs-modal/inputs-modal.component';

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
  identificacion: any;
  telefeno: any;
  selectAddressOrder: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  private municipality = new BehaviorSubject<any>({});
  municipality$ = this.municipality.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private addresses = new BehaviorSubject<any[]>([]);
  addresses$ = this.addresses.asObservable();
  private infoUser = new BehaviorSubject<any>({});
  infoUser$ = this.infoUser.asObservable();
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
    this.fetchInfoUser();
    this.fetchAllAddress();
    this.order$.subscribe(data => {
      console.log(data);
      this.order = data;
    });
    this.address$.subscribe(address => {
      console.log(address);
      this.selectAddressOrder = address;
      this.utilityService.getAllMunicipality().subscribe(data => {
        console.log(data);
        const municipalitySelect = data.filter(municipality => municipality.id === address.idutmunicipality);
        console.log(municipalitySelect);
        this.municipality.next(municipalitySelect[0]);
      });
    });
  }

  fetchInfoUser() {
    this.usersService.getInfoUser().subscribe(([data]) => {
      console.log(data);
      this.infoUser.next(data);
      this.secondFormGroup.patchValue(data);
      this.secondFormGroup.get('telefono').setValue(data.telefeno);
      console.log(this.secondFormGroup.value);
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
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      identificacion: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      confirmacion: ['', Validators.required],
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

  openDialogEditPhone(): void {
    const dialogRef = this.dialog.open(InputsModalComponent, {
      width: '300px',
      data: { message: 'Editar celular'}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result?.confirm === 'OK' && result?.telefono !== '') {
        this.secondFormGroup.get('telefono').setValue(result.telefono);
        this.usersService.editInfoUser(this.secondFormGroup.value).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.fetchInfoUser();
          }
        });
      }
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
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: { message: 'Confirme la orden por favor' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'SI') {
        console.log(this.selectAddressOrder);
        this.usersService.editInfoUser(this.secondFormGroup.value).subscribe(console.log);
        this.orderService.createSells(this.order, this.selectAddressOrder.id)
          .subscribe(({ status, data }: any) => {
            console.log(status, data);
            const idSell = data[0].idSell;
            if (status === 'OK') {
              this.cartService.resetOrder();
              // tslint:disable-next-line: prefer-for-of
              for (let i = 0; i < data.length; i++) {
                data[i].nameUser = this.authService.getUserName();
                console.log(data);
              }
              this.orderService.emitNewOrder(data);
              this.router.navigate([`/user/orders/detail/${idSell}`]);
            }
        });
      }
    });
  }

  stateInputIdentificacion(state) {
    this.identificacion = state;
  }

  stateInputTelefono(state) {
    this.telefeno = state;
  }

}
