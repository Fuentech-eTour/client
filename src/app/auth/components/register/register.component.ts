import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const check = this.form.value;
      if (check.password !== check.password2) {
        alert('Las contraseñas no coinsiden');
      } else {
        const user = this.form.value;
        this.authService.createUser(user)
        .subscribe( () => {
          this.router.navigate(['./auth/login']);
        });
      }
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

}
