import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginUserStoreComponent } from '../../../auth/components/login-user-store/login-user-store.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField: FormControl;

  constructor(
    private dialog: MatDialog,
  ) {
    this.emailField = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    // this.emailField.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  ngOnInit() {
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginUserStoreComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  sendMail() {
    if (this.emailField.valid) {
    }
  }

}
