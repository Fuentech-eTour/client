import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@core/services/users.service';
import { WindowService } from '@core/services/window.service';
import { MyValidator } from './../../../utils/validators';

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
    private router: Router,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveUserStore(event: Event) {
    event.preventDefault();
    console.log(this.form.get('urol').value);
    if (this.form.valid) {
      this.windowService.loadingTrue();
      this.form.value.userlog = this.form.get('usuario').value;
      this.usersService.createUserStore(this.form.value)
        .subscribe((res: any) => {
          console.log(res);
          this.windowService.loadingFalse();
          if (res.status === 'OK') {
            this.windowService.loadingTrue();
            const createPermission = {
              urol: this.form.get('urol').value,
              id: res.userid,
            };
            this.usersService.createPermisionUserStore(createPermission)
              .subscribe(resPermission => {
                console.log(resPermission);
                this.windowService.loadingFalse();
                this.form.reset();
                this.router.navigate(['/super-admin/create-user-store']);
              });
          }
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      digitoclave: ['', Validators.required],
      usuario: ['', [Validators.required]],
      userlog: '',
      clave: ['', [Validators.required]],
      repClave: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      cargo: ['', [Validators.required, MyValidator.isPreciValid]],
      urol: ['', [Validators.required]],
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
