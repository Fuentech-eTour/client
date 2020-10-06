import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { StoresService } from '@core/services/stores.service';
import { ProductsService } from '@core/services/products/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '@core/services/order.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  passwordVerify: boolean;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private windowService: WindowService,
    private orderService: OrderService,
    private storesService: StoresService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    const check = this.form.value;
    if (check.clave !== check.clave2) {
      return;
    }
    this.form.value.correoverifica = this.form.get('email').value;
    this.form.value.password = this.form.get('clave').value;
    if (this.form.valid) {
      this.windowService.loadingTrue();
      this.authService.createUser(this.form.value)
      .subscribe( (resData: any) => {
        this.windowService.loadingFalse();
        if (resData.status === 'OK') {
          this.windowService.loadingTrue();
          this.dialogRef.close();
          this.authService.login(this.form.value)
            .subscribe((res: any) => {
              this.openSnackBar(res.message);
              this.windowService.loadingFalse();
              if (res.status === 'OK') {
                this.openSnackBar('Inicio de sesión exitoso');
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('user_name', res.data.user_name);
                localStorage.setItem('session', 'isClient');
                localStorage.setItem('idClient', res.data.dato);
                this.orderService.joinUser();
                this.windowService.stateSession('isClient');
                this.windowService.addIdClient(res.data.dato);
                this.windowService.addUserName(res.data.user_name.split(' ')[0]);
                this.storesService.getStoreFavorite().subscribe(data => {
                  this.storesService.stateFavoriteStore(data);
                });
                this.productsService.getFavoriteProducts().subscribe(data => {
                  this.productsService.stateFavoriteProducts(data);
                });
                this.router.navigate(['./stores']);
              }
            });
        }
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required]],
      correoverifica: '',
      identificacion: '',
      telefono: '',
      clave: ['', [Validators.required]],
      clave2: ['', [Validators.required]],
      password: '',
    });
  }

  get claveField() {
    return this.form.get('clave2');
  }

  validatorPassword() {
    const check = this.form.value;
    if (check.clave !== check.clave2) {
      this.passwordVerify = true;
    } else {
      this.passwordVerify = false;
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
