import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '@core/services/stores.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['Nit', 'Razon-social', 'Acciones'];
  form: FormGroup;
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private stores = new BehaviorSubject<any>([]);
  stores$ = this.stores.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private storesService: StoresService,
    private dialog: MatDialog,
  ) {
    this.buildForm();
   }

   ngOnInit(): void {
    this.fetchStores();
  }

  fetchStores() {
    this.isloading.next(true);
    this.storesService.getAllStores().subscribe(data => {
      this.isloading.next(false);
      this.stores.next(data);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      tag: ['', Validators.required],
    });
  }

  inactivateStore(idstore: number): void {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: { message: '¿desea eliminar esta tienda?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SI') {
        this.isloading.next(true);
        this.storesService.inactivateStore(idstore).subscribe((res: any) => {
          this.isloading.next(false);
          this.openSnackBar(res.message);
          if (res.status === 'Ok') {
            this.fetchStores();
          }
        });
      }
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
