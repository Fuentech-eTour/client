import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilityService } from '@core/services/utility.service';
import { UsersService } from '@core/services/users.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  form: FormGroup;
  municipalities: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private utilityService: UtilityService,
    private usersService: UsersService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.fetchAllMunicipality();
  }

  fetchAllMunicipality() {
    this.utilityService.getAllMunicipality().subscribe(data => {
      this.municipalities = data;
    });
  }

  saveAddress(event: Event) {
    const newAddress = this.form.value;
    this.usersService.createAddress(newAddress).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'OK') {
        this.form.reset();
        this.onNoClick();
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      direccion: ['', Validators.required],
      idmunicipio: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    alert('Thanks!');
  }
}
