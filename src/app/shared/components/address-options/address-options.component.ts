import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-options',
  templateUrl: './address-options.component.html',
  styleUrls: ['./address-options.component.scss']
})
export class AddressOptionsComponent implements OnInit {

  panelOpenState = false;

  constructor(
    public dialogRef: MatDialogRef<AddressOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
