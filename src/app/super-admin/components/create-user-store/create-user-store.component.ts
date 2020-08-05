import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '@core/services/users.service';
import { MyValidator } from './../../../utils/validators';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-user-store',
  templateUrl: './create-user-store.component.html',
  styleUrls: ['./create-user-store.component.scss']
})
export class CreateUserStoreComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  date = new Date().getDate();
  passwordVerify: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveUserStore(event: Event) {
    event.preventDefault();
    this.form.value.userlog = this.form.get('usuario').value;
    const userStore = this.form.value;
    this.usersService.createUserStore(userStore)
      .subscribe(() => {
        this.router.navigate(['/super-admin/create-user-store']);
    });
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
