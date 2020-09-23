import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

import { StoresService } from '@core/services/stores.service';
import { WindowService } from '@core/services/window.service';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../../../core/services/utility.service';
import { TagsService } from '@core/services/tags.service';

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
                console.log(res);
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
                    horaini: this.form.get('horaini').value,
                    horafin: this.form.get('horafin').value,
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
      horaini: ['', Validators.required],
      horafin: ['', Validators.required],
    });
  }

}
