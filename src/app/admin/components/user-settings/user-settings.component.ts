import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { StoresService } from '@core/services/stores.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  private isloadingPassword = new BehaviorSubject<boolean>(false);
  isloadingPassword$ = this.isloadingPassword.asObservable();

  formUserStore: FormGroup;
  idStore = parseInt(this.authService.getIdStore(), 10);
  hide = true;
  hide2 = true;
  hide3 = true;

  constructor(
    private snackBar: MatSnackBar,
    private storesService: StoresService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.fetchUserStore();
  }

  fetchUserStore() {
    this.storesService.getUsersStoreByUser()
    .subscribe(data => {
      data[0].clave = '';
      this.formUserStore.patchValue(data[0]);
    });
  }

  savePassword(event: Event) {
    event.preventDefault();
    this.isloadingPassword.next(true);
    this.storesService.editUserStoreByUser(this.formUserStore.value)
    .subscribe((res: any) => {
      this.isloadingPassword.next(false);
      this.openSnackBar(res.message);
      if (res.status === 'Ok') {
        this.formUserStore.reset();
      }
    });
  }

  match(firstControlName, secondControlName, customError = 'mismatch') {
    return (fg: FormGroup) => {
        return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true };
    };
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  buildForm() {
    this.formUserStore = this.formBuilder.group({
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repiteClave: ['', Validators.required],
      usuario: ['', [Validators.required]],
      userlog: '',
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      },
      {
        validator: this.match('clave', 'repiteClave', 'password-mismatch')
      });
  }
}
