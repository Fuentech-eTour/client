import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@core/services/users.service';
import { WindowService } from '@core/services/window.service';
import { MyValidator } from './../../../utils/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '@core/services/stores.service';

@Component({
  selector: 'app-edit-user-store',
  templateUrl: './edit-user-store.component.html',
  styleUrls: ['./edit-user-store.component.scss']
})
export class EditUserStoreComponent implements OnInit {

  form: FormGroup;
  passwordVerify: boolean;
  infoUserStore: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private windowService: WindowService,
    private storesService: StoresService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.storesService.userStore$.subscribe(data => {
      this.infoUserStore = data;
      this.form.patchValue(data);
      this.form.get('clave').setValue('');
    });
  }

  saveUserStore(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.windowService.loadingTrue();
      this.form.value.userlog = this.form.get('usuario').value;
      this.storesService.editUserStoreBySuperAdmin(this.infoUserStore.id, this.form.value)
        .subscribe((res: any) => {
          this.openSnackBar(res.message);
          this.windowService.loadingFalse();
          if (res.status === 'OK' || res.status === 'Ok') {
          this.router.navigate(['super-admin/stores']);
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
      userlog: '',
      clave: [''],
      repClave: [''],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
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
