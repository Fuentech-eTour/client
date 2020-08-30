import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { UsersService } from '@core/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  form: FormGroup;
  hide = true;
  hide2 = true;
  hide3 = true;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  savePassword(event: Event) {
    const newPassword = this.form.value;
    console.log(newPassword);
    this.usersService.editPassword(newPassword).subscribe((res: any) => {
      this.openSnackBar(res.message);
      if (res.status === 'OK') {
        this.form.reset();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group(
      {
      // claveActual: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repiteClave: ['', Validators.required]
      },
      {
          validator: this.match('clave', 'repiteClave', 'password-mismatch')
      });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  match(firstControlName, secondControlName, customError = 'mismatch') {
    return (fg: FormGroup) => {
        return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true };
    };
}

}
