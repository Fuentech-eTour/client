import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '@core/services/users.service';
import { UtilityService } from '@core/services/utility.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-address-options',
  templateUrl: './address-options.component.html',
  styleUrls: ['./address-options.component.scss']
})
export class AddressOptionsComponent implements OnInit {

  form: FormGroup;
  panelOpenState = false;
  municipalities: any;

  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private addresses = new BehaviorSubject<any>([]);
  addresses$ = this.addresses.asObservable();

  constructor(
    public dialogRef: MatDialogRef<AddressOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.fetchAllMunicipality();
    this.fetchAllAddress();
  }

  fetchAllAddress() {
    this.usersService.getAllAddress().subscribe(data => {
      this.isloading.next(false);
      this.addresses.next(data);
    });
  }

  fetchAllMunicipality() {
    this.utilityService.getAllMunicipality().subscribe(data => {
      this.municipalities = data;
    });
  }

  selectAddress(address) {
    this.usersService.addSelectAddress(address);
  }

  saveAddress(event: Event) {
    const newAddress = this.form.value;
    this.usersService.createAddress(newAddress).subscribe((res: any) => {
      if (res.status === 'OK') {
        this.form.reset();
        this.fetchAllAddress();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required],
      idmunicipio: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
