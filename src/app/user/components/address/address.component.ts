import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '@core/services/utility.service';
import { UsersService } from '@core/services/users.service';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})
export class AddressComponent implements OnInit {
  items: any;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['Direccion', /* 'Municipio',  */'Acciones'];
  form: FormGroup;
  municipalities: any;
  private address = new BehaviorSubject<any>([]);
  address$ = this.address.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.fetchAllMunicipality();
    this.fetchAllAddress();
  }

  fetchAllMunicipality() {
    this.utilityService.getAllMunicipality().subscribe(data => {
      this.municipalities = data;
      this.items = data;
    });
  }

  fetchAllAddress() {
    this.isloading.next(true);
    this.usersService.getAllAddress().subscribe(data => {
      this.isloading.next(false);
      this.address.next(data);
    });
  }

  saveAddress(event: Event) {
    const newAddress = this.form.value;
    this.usersService.createAddress(newAddress).subscribe((res: any) => {
      this.openSnackBar(res.message);
      if (res.status === 'OK') {
        this.form.reset();
        this.fetchAllAddress();
      }
    });
  }

  deleteAddress(iddir: number) {
    this.usersService.deleteAddress(iddir, {estado: 0}).subscribe(res => {
      this.fetchAllAddress();
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required],
      idmunicipio: ['', Validators.required],
    });
  }

  openDialog(address: any): void {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '300px',
      data: {data: address, municipalities: this.municipalities}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchAllAddress();
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class EditAddressComponent implements OnInit {
  form: FormGroup;
  address: any;
  municipalities: any;
  stateSpinner: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    ) {
      this.buildForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const { municipalities } = this.data;
    this.municipalities = municipalities;
    // implementacion de spinner en input y select
    /* this.stateSpinner = true;
    this.utilityService.getAllMunicipality().subscribe(municipalities => {
      this.municipalities = municipalities;
      this.stateSpinner = false;
      const { data } = this.data;
      this.form.patchValue(data);
    }); */
    const { data } = this.data;
    this.form.patchValue(data);
  }

  editAddress(event: Event) {
    const { data } = this.data;
    const iddir = data.id;
    const editAddress = this.form.value;
    this.usersService.editAddress(iddir, editAddress).subscribe((res: any) => {
      this.openSnackBar(res.message);
      if (res.status === 'OK') {
        this.onNoClick();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required],
      idutmunicipality: ['', Validators.required],
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
