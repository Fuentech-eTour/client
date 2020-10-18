import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '@core/services/stores.service';

@Component({
  selector: 'app-assing-category',
  templateUrl: './assing-category.component.html',
  styleUrls: ['./assing-category.component.scss']
})
export class AssingCategoryComponent implements OnInit {

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
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.fetchStoresSlopeTag();
  }

  fetchStoresSlopeTag() {
    this.isloading.next(true);
    this.storesService.getAllStoresWithProduct(0).subscribe(data => {
      console.log(data);
      this.isloading.next(false);
      this.stores.next(data);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      tag: ['', Validators.required],
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
