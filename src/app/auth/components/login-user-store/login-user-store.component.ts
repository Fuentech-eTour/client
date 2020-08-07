import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';

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
    public dialogRef: MatDialogRef<LoginUserStoreComponent>
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    this.windowService.loadingTrue();
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.loginUserStore(user)
        .subscribe( (res: any) => {
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('user_name', res.data.user_name);
          this.windowService.addUserName(res.data.user_name.split(' ')[0]);
          this.router.navigate(['./admin']);
          this.windowService.loadingFalse();
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

}
