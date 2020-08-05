import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from './../../../core/services/auth.service';
import { WindowService } from './../../../core/services/window.service';


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
    public dialogRef: MatDialogRef<LoginComponent>
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
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('user_name', res.data.user_name);
          this.windowService.addUserName(res.data.user_name.split(' ')[0]);
          this.router.navigate(['./stores']);
          this.windowService.loadingFalse();
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
}
