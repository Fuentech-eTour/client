import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { StoresService } from '@core/services/stores.service';
import { ProductsService } from '@core/services/products/products.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  passwordVerify: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private windowService: WindowService,
    private storesService: StoresService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<RegisterComponent>
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
      .subscribe( (res: any) => {
        this.windowService.loadingFalse();
        if (res.status === 'OK') {
          this.windowService.loadingTrue();
          this.dialogRef.close();
          this.authService.login(this.form.value)
            .subscribe((resLogin: any) => {
              if (resLogin.status === 'OK') {
                localStorage.setItem('token', resLogin.data.accessToken);
                localStorage.setItem('user_name', resLogin.data.user_name);
                localStorage.setItem('session', 'isClient');
                this.windowService.stateSession('isClient');
                this.windowService.addUserName(resLogin.data.user_name.split(' ')[0]);
                this.storesService.getStoreFavorite().subscribe(data => {
                  this.storesService.stateFavoriteStore(data);
                });
                this.productsService.getFavoriteProducts().subscribe(data => {
                  this.productsService.stateFavoriteProducts(data);
                });
                this.router.navigate(['./stores']);
                this.windowService.loadingFalse();
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

}
