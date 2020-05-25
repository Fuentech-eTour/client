import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  addressForm = this.fb.group({
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required]
  });

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'}
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog) {
      this.buildForm();
    }

  private buildForm() {
    this.form = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  onSubmit() {
    alert('Thanks!');
  }
}
