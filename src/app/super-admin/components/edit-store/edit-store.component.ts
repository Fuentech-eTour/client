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
  tagsStore: any;
  idstore: number;
  idconfig: number;
  verificationDigit: any[];

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
    this.verificationDigit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.storesService.getOneStores(parseInt(params.id, 10)).subscribe(store => {
        console.log(store, parseInt(params.id, 10));
        this.image = store[0].imagen;
        this.idstore = store[0].id;
        this.idconfig = store[0].idconfig;
        this.form.patchValue(store[0]);
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
                  console.log(res);
                  this.openSnackBar(res.message);
                  this.windowService.loadingFalse();
                  if (res.status === 'OK' || res.status === 'Ok') {
                    this.windowService.loadingTrue();
                    const config = {
                      valormin: this.form.get('valormin').value,
                      horaini: this.form.get('horaini').value,
                      horafin: this.form.get('horafin').value,
                      estado: 1,
                    };
                    this.storesService.updateConfigStore(this.idconfig, config)
                    .subscribe((resConfig: any) => {
                      this.openSnackBar(resConfig.message);
                      this.windowService.loadingFalse();
                      if (resConfig.status === 'Ok' || resConfig.status === 'OK') {
                        this.form.reset();
                        this.image = '';
                        this.router.navigate(['/super-admin/stores']);
                      }
                    });
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
            console.log(res);
            this.openSnackBar(res.message);
            this.windowService.loadingFalse();
            if (res.status === 'OK' || res.status === 'Ok') {
              this.windowService.loadingTrue();
              const config = {
                valormin: this.form.get('valormin').value,
                horaini: this.form.get('horaini').value,
                horafin: this.form.get('horafin').value,
                estado: 1,
              };
              this.storesService.updateConfigStore(this.idconfig, config)
              .subscribe((resConfig: any) => {
                this.openSnackBar(resConfig.message);
                this.windowService.loadingFalse();
                if (resConfig.status === 'Ok' || resConfig.status === 'OK') {
                  this.form.reset();
                  this.image = '';
                  this.router.navigate(['/super-admin/stores']);
                }
              });
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
      valormin: ['', Validators.required],
      horaini: ['', Validators.required],
      horafin: ['', Validators.required],
    });
  }

}
