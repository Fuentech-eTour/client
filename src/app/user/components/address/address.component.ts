import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '@core/services/utility.service';
import { UsersService } from '@core/services/users.service';

import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */

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
  address: any;
  municipalities: any;
  animal: string;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.utilityService.getAllMunicipality().subscribe(data => {
      this.municipalities = data;
      this.items = data;
    });
    this.usersService.getAllAddress().subscribe(data => {
      this.address = data;
    });
  }

  saveProduct(event: Event) {
    const newAddress = this.form.value;
    this.usersService.createAddress(newAddress).subscribe((res: any) => {
      if (res.status === 'OK') {
        this.form.reset();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required],
      idmunicipio: ['', Validators.required],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '300px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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

  constructor(
    public dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private usersService: UsersService,
    ) {
      this.buildForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.utilityService.getAllMunicipality().subscribe(data => {
      this.municipalities = data;
    });
    this.usersService.getAllAddress().subscribe(data => {
      this.address = data;
    });
  }

  saveProduct(event: Event) {
    const newAddress = this.form.value;
    this.usersService.createAddress(newAddress).subscribe((res: any) => {
      if (res.status === 'OK') {
        this.form.reset();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required],
      idmunicipio: ['', Validators.required],
    });
  }

}
