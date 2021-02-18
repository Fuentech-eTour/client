import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../../../core/services/utility.service';
import { TagsService } from '@core/services/tags.service';
import { MatDialog } from '@angular/material/dialog';
import { OptionsModalComponent } from '../options-modal/options-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suggested-store-registration',
  templateUrl: './suggested-store-registration.component.html',
  styleUrls: ['./suggested-store-registration.component.scss']
})
export class SuggestedStoreRegistrationComponent implements OnInit {

  form: FormGroup;
  municipalities: any;
  tagsStore: any;
  verificationDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private storesService: StoresService,
    private windowService: WindowService,
    private utilityService: UtilityService,
    private tagsService: TagsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.buildForm();
    this.isLoading$ = this.windowService.isloading$;
  }

  ngOnInit(): void {
    this.fetchAllMunicipality();
    this.fetchAllTagsStore();
  }

  fetchAllMunicipality() {
    this.utilityService.getAllMunicipality().subscribe(data => {
      this.municipalities = data;
    });
  }

  fetchAllTagsStore() {
    this.tagsService.getAllTagsStores().subscribe(data => {
      this.tagsStore = data;
    });
  }

  saveStore(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open( OptionsModalComponent, {
      width: '280px',
      data: {
        emailStore: this.form.get('email').value.toString().split(' ').join(''),
      }
    });

    dialogRef.afterClosed().subscribe(results => {
      console.log(results);
      if (results === 'SI') {
        if (this.form.valid) {
          this.windowService.loadingTrue();
          const nit = this.form.get('identificacion').value.toString().split(' ').join('');
          this.form.get('digitoclave').setValue(nit);
          const store = this.form.value;
          this.storesService.createStoreByUser(store)
          .subscribe((res: any) => {
            console.log(res);
            this.openSnackBar(res.message);
            if (res.status === 'OK') {
              this.form.reset();
              this.router.navigate(['/suggested/store/instructions/create-user-store']);
            }
            this.windowService.loadingFalse();
          });
        }
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

  private buildForm() {
    this.form = this.formBuilder.group({
      tipodoc: ['NIT', Validators.required],
      identificacion: ['', [Validators.required]],
      digito: ['', [Validators.required]],
      razonsocial: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      regimen: ['', [Validators.required]],
      idutmunicipality: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      digitoclave: ['0', [Validators.required]],
      imagen: [''],
    });
  }

}
