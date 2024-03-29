import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../../../core/services/utility.service';
import { TagsService } from '@core/services/tags.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  date = new Date().getTime();
  passwordVerify: boolean;
  image: any;
  file: any;
  municipalities: any;
  idTag: number;
  tagsStore: any;
  idstore: number;
  idconfig: number;
  verificationDigit: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  days: any[];
  existingBusinessHours = true;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
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
    this.activatedRoute.params.subscribe((params: Params) => {
      this.storesService.getOneStores(parseInt(params.id, 10))
      .subscribe(store => {
        this.image = store[0].imagen;
        this.idstore = store[0].id;
        this.idconfig = store[0].idconfig;
        this.idTag = store[0].idtagstore;
        this.form.patchValue(store[0]);
      });
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.storesService.getConfigBusinessHours(parseInt(params.id, 10))
      .subscribe((data: any) => {
        if (data.status === 402) {
          this.existingBusinessHours = false;
          this.days = [
            { idutdays: 1, dia: 'Lunes' },
            { idutdays: 2, dia: 'Martes' },
            { idutdays: 3, dia: 'Miércoles' },
            { idutdays: 4, dia: 'Jueves' },
            { idutdays: 5, dia: 'Viernes' },
            { idutdays: 6, dia: 'Sábado' },
            { idutdays: 7, dia: 'Domingo' }
          ];
        } else {
          this.days = data;
          for (const hours of data) {
            if (hours.horaini !== '00:00:00' && hours.horafin !== '00:00:00') {
              this.form.get(`horaini${hours.idutdays}`).setValue(hours.horaini);
              this.form.get(`horafin${hours.idutdays}`).setValue(hours.horafin);
            }
          }
        }
      });
    });
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

  editStore(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.windowService.loadingTrue();
      const nameStore = this.form.get('razonsocial').value.toString().split(' ').join('');
      const file = this.file;
      if (file) {
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
              this.storesService.updateOneStores(this.idstore, store)
                .subscribe((res: any) => {
                  this.openSnackBar(res.message);
                  this.windowService.loadingFalse();
                  if (res.status === 'OK' || res.status === 'Ok') {
                    this.windowService.loadingTrue();
                    const config = {
                      valormin: this.form.get('valormin').value,
                      valordomicilio: this.form.get('valordomicilio').value,
                      horaini: this.form.get('horaini').value,
                      horafin: this.form.get('horafin').value,
                      estado: 1,
                    };
                    this.storesService.updateConfigStore(this.idconfig, config)
                    .subscribe((resConfig: any) => {
                      this.openSnackBar(resConfig.message);
                      this.windowService.loadingFalse();
                      if (resConfig.status === 'Ok' || resConfig.status === 'OK') {
                        this.windowService.loadingTrue();
                        const idTag = this.form.get('iduttagstores').value;
                        this.storesService.editTagStore({ idtagtienda: this.idTag, nuevotag: idTag })
                        .subscribe(resul => {
                          this.windowService.loadingFalse();
                          this.form.reset();
                          this.image = '';
                          this.router.navigate(['/super-admin/stores']);
                        });
                      }
                    });
                    if (this.existingBusinessHours === true) {
                      const businessHours: any[] = [];
                      for (const hours of this.days) {
                        const objectBusinessHours = {
                          idConfig: hours.id, idday: hours.idutdays,
                          horaini: this.form.get(`horaini${hours.idutdays}`).value,
                          horafin: this.form.get(`horafin${hours.idutdays}`).value
                        };
                        businessHours.push(objectBusinessHours);
                      }
                      for (const hours of businessHours) {
                        if (hours.horaini !== ' ' && hours.horafin !== ' ') {
                          this.storesService.updateConfigBusinessHours(hours.idConfig, hours)
                          .subscribe((resHours: any) => {
                            this.openSnackBar(resHours.message);
                          });
                        }
                      }
                    } else {
                      const businessHours: any[] = [];
                      for (const hours of this.days) {
                        if (this.form.get(`horaini${hours.idutdays}`).value !== ' ' &&
                            this.form.get(`horafin${hours.idutdays}`).value !== ' ') {
                          // tslint:disable-next-line: no-shadowed-variable
                          const objectBusinessHours = {
                            idstore: this.idstore, idday: hours.idutdays,
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
                            idstore: this.idstore, idday: hours.idutdays,
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
                  }
              });
            });
          })
        )
        .subscribe();
      } else {
        const store = this.form.value;
        this.storesService.updateOneStores(this.idstore, store)
          .subscribe((res: any) => {
            this.openSnackBar(res.message);
            this.windowService.loadingFalse();
            if (res.status === 'OK' || res.status === 'Ok') {
              this.windowService.loadingTrue();
              const config = {
                valormin: this.form.get('valormin').value,
                valordomicilio: this.form.get('valordomicilio').value,
                estado: 1,
              };
              this.storesService.updateConfigStore(this.idconfig, config)
              .subscribe((resConfig: any) => {
                this.openSnackBar(resConfig.message);
                this.windowService.loadingFalse();
                if (resConfig.status === 'Ok' || resConfig.status === 'OK') {
                  this.windowService.loadingTrue();
                  const idTag = this.form.get('iduttagstores').value;
                  this.storesService.editTagStore({ idtagtienda: this.idTag, nuevotag: idTag })
                  .subscribe(resul => {
                    this.windowService.loadingFalse();
                    this.form.reset();
                    this.image = '';
                    this.router.navigate(['/super-admin/stores']);
                  });
                }
              });
              if (this.existingBusinessHours === true) {
                const businessHours: any[] = [];
                for (const hours of this.days) {
                  const objectBusinessHours = {
                    idConfig: hours.id, idday: hours.idutdays,
                    horaini: this.form.get(`horaini${hours.idutdays}`).value,
                    horafin: this.form.get(`horafin${hours.idutdays}`).value
                  };
                  businessHours.push(objectBusinessHours);
                }
                for (const hours of businessHours) {
                  if (hours.horaini !== ' ' && hours.horafin !== ' ') {
                    this.storesService.updateConfigBusinessHours(hours.idConfig, hours)
                    .subscribe((resHours: any) => {
                      this.openSnackBar(resHours.message);
                    });
                  }
                }
              } else {
                const businessHours: any[] = [];
                for (const hours of this.days) {
                  if (this.form.get(`horaini${hours.idutdays}`).value !== ' ' &&
                      this.form.get(`horafin${hours.idutdays}`).value !== ' ') {
                    // tslint:disable-next-line: no-shadowed-variable
                    const objectBusinessHours = {
                      idstore: this.idstore, idday: hours.idutdays,
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
                      idstore: this.idstore, idday: hours.idutdays,
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
            }
        });
      }
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
      iduttagstores: ['', Validators.required],
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
