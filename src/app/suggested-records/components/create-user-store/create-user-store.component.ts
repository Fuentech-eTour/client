import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPermission, UserStoreLogin } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-create-user-store',
  templateUrl: './create-user-store.component.html',
  styleUrls: ['./create-user-store.component.scss']
})
export class CreateUserStoreComponent implements OnInit {

  form: FormGroup;
  passwordVerify: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private windowService: WindowService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ token }) => {
      this.form.get('token').setValue(token);
      console.log(this.form.get('token').value);
    });
  }

  saveUserStore(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.windowService.loadingTrue();
      this.usersService.createUserStoreByUser(this.form.value)
      .subscribe((res: any) => {
        this.openSnackBar(res.message);
        this.windowService.loadingFalse();
        if (res.status === 'OK') {
          this.windowService.loadingTrue();
          const createPermission: UserPermission = {
            urol: this.form.get('urol').value,
            idUserStore: res.userid,
          };
          this.usersService.createPermisionUserStoreByUser(createPermission)
            .subscribe((resPermission: any) => {
              this.windowService.loadingFalse();
              if (resPermission.status === 'OK') {
                const credentialUserStore: UserStoreLogin = {
                  digitoclave: res.identificacion,
                  email: this.form.get('usuario').value,
                  password: this.form.get('clave').value,
                }
                this.authService.loginUserStore(credentialUserStore).subscribe(data => {
                  this.form.reset();
                  if (data.status === 'OK') {
                    this.openSnackBar('Inicio de sesión exitoso');
                    this.router.navigate(['./admin']);
                  }
                });
              }
              if (resPermission.status !== 'OK') {
                this.openSnackBar(resPermission.message);
              }
            });
        }
      });
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      repClave: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      urol: [3, [Validators.required]],
      token: ['', [Validators.required]],
    });
  }

  get claveField() {
    return this.form.get('repClave');
  }

  validatorPassword() {
    const clave = this.form.get('clave').value;
    const repClave = this.form.get('repClave').value;
    if (clave !== repClave) {
      this.passwordVerify = true;
    } else {
      this.passwordVerify = false;
    }
  }

}
