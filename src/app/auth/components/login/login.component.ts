import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { StoresService } from '@core/services/stores.service';
import { ProductsService } from '@core/services/products/products.service';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private windowService: WindowService,
    private storesService: StoresService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  /* login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.login(value.email, value.password)
      .then(() => {
        this.router.navigate(['/admin']);
      })
      .catch(() => {
        alert('no es valido');
      });
    }
  } */

  login(event: Event) {
    this.windowService.loadingTrue();
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.login(user)
        .subscribe( (res: any) => {
          console.log(res);
          this.openSnackBar(res.message);
          this.windowService.loadingFalse();
          if (res.status === 'OK') {
            this.openSnackBar('Inicio de sesión exitoso');
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('user_name', res.data.user_name);
            localStorage.setItem('session', 'isClient');
            localStorage.setItem('idClient', res.data.dato);
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  openComponentRegister() {
    this.dialog.open(RegisterComponent, {
      width: 'auto'
    });
    this.onNoClick();
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
