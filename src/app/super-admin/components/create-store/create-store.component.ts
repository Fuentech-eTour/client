import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../../../core/services/utility.service';
import { TagsService } from '@core/services/tags.service';
import { Days } from '@core/models/store.model';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  date = new Date().getTime();
  passwordVerify: boolean;
  image: any;
  file: any;
  municipalities: any;
  tagsStore: any;
  verificationDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  days: Days[] = [
    { idutdays: 1, name: 'Lunes', initials: 'Lu' },
    { idutdays: 2, name: 'Martes', initials: 'Ma' },
    { idutdays: 3, name: 'Miércoles', initials: 'Mi' },
    { idutdays: 4, name: 'Jueves', initials: 'Ju' },
    { idutdays: 5, name: 'Viernes', initials: 'Vi' },
    { idutdays: 6, name: 'Sábado', initials: 'Sa' },
    { idutdays: 7, name: 'Domingo', initials: 'Do' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private storesService: StoresService,
    private windowService: WindowService,
    private utilityService: UtilityService,
    private tagsService: TagsService,
    private router: Router,
    private angularFireStorage: AngularFireStorage,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
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
    if (this.form.valid) {
      this.windowService.loadingTrue();
      const nameStore = this.form.get('razonsocial').value.toString().split(' ').join('');
      const file = this.file;
      const name = `store-${nameStore}-${this.date}.png`;
      const fileRef = this.angularFireStorage.ref(name);
      const task = this.angularFireStorage.upload(name, file);

      task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.form.get('imagen').setValue(url);
            const store = this.form.value;
            this.storesService.createStore(store)
              .subscribe((res: any) => {
                this.openSnackBar(res.message);
                this.windowService.loadingFalse();
                if (res.status === 'OK') {
                  this.windowService.loadingTrue();
                  this.storesService.assingTagStore(res.idstore, this.form.get('idtag').value)
                  .subscribe((resTag: any) => {
                    this.openSnackBar(resTag.message);
                    this.windowService.loadingFalse();
                    if (resTag.status === 'Ok') {
                      this.form.reset();
                      this.image = '';
                      this.router.navigate(['/super-admin/create-store']);
                    }
                  });
                  const config = {
                    valormin: this.form.get('valormin').value,
                    valordomicilio: this.form.get('valordomicilio').value,
                    /* horaini: this.form.get('horaini').value,
                    horafin: this.form.get('horafin').value, */
                  };
                  this.storesService.assingConfigStore(res.idstore, config)
                  .subscribe((resConfig: any) => {
                    this.openSnackBar(resConfig.message);
                    this.windowService.loadingFalse();
                    if (resConfig.status === 'Ok' || resConfig.status === 'OK') {
                      this.form.reset();
                      this.image = '';
                      this.router.navigate(['/super-admin/create-store']);
                    }
                  });
                  const businessHours: any[] = [];
                  for (const hours of this.days) {
                    if (this.form.get(`horaini${hours.idutdays}`).value !== ' ' &&
                        this.form.get(`horafin${hours.idutdays}`).value !== ' ') {
                      // tslint:disable-next-line: no-shadowed-variable
                      const objectBusinessHours = {
                        idstore: res.idutdaysstore, idday: hours.idutdays,
                        horaini: this.form.get(`horaini${hours.idutdays}`).value,
                        horafin: this.form.get(`horafin${hours.idutdays}`).value
                      };
                      businessHours.push(objectBusinessHours);
                    } else {
                      this.form.get(`horaini${hours.idutdays}`).setValue('00:00:00');
                      this.form.get(`horafin${hours.idutdays}`).setValue('00:00:00');
                      const horaini = this.form.get(`horaini${hours.idutdays}`).value;
                      const horafin = this.form.get(`horafin${hours.idutdays}`).value;
                      // tslint:disable-next-line: no-shadowed-variable
                      const objectBusinessHours = {
                        idstore: res.idstore, idday: hours.idutdays,
                        horaini,
                        horafin
                      };
                      businessHours.push(objectBusinessHours);
                    }
                  }
                  for (const hours of businessHours) {
                    this.storesService.createConfigBusinessHours(hours)
                    .subscribe((resHours: any) => {
                      this.openSnackBar(resHours.message);
                    });
                  }
                }
            });
          });
        })
      )
      .subscribe();
    }
  }

  uploadFile(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.image = reader.result;
      this.form.get('imagen').setValue('url');
    };
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
      tipodoc: ['', Validators.required],
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
      digitoclave: ['', [Validators.required]],
      imagen: ['', Validators.required],
      idtag: ['', Validators.required],
      valormin: ['', Validators.required],
      valordomicilio: ['', Validators.required],
      horaini1: [' ', Validators.required],
      horafin1: [' ', Validators.required],
      horaini2: [' ', Validators.required],
      horafin2: [' ', Validators.required],
      horaini3: [' ', Validators.required],
      horafin3: [' ', Validators.required],
      horaini4: [' ', Validators.required],
      horafin4: [' ', Validators.required],
      horaini5: [' ', Validators.required],
      horafin5: [' ', Validators.required],
      horaini6: [' ', Validators.required],
      horafin6: [' ', Validators.required],
      horaini7: [' ', Validators.required],
      horafin7: [' ', Validators.required],
    });
  }

}
