import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreLogin } from '@core/models/user.model';

@Component({
  selector: 'app-login-user-store',
  templateUrl: './login-user-store.component.html',
  styleUrls: ['./login-user-store.component.scss']
})
export class LoginUserStoreComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private windowService: WindowService,
    public dialogRef: MatDialogRef<LoginUserStoreComponent>,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    this.windowService.loadingTrue();
    event.preventDefault();
    if (this.form.valid) {
      const user: UserStoreLogin = this.form.value;
      this.authService.loginUserStore(user)
        .subscribe( (res: any) => {
          this.openSnackBar(res.message);
          this.windowService.loadingFalse();
          if (res.status === 'OK') {
            this.openSnackBar('Inicio de sesión exitoso');
            this.router.navigate(['./admin']);
          }
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      digitoclave: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
