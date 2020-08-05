import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

import { StoresService } from '@core/services/stores.service';
import { MyValidator } from './../../../utils/validators';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private storesService: StoresService,
    private router: Router,
    private angularFireStorage: AngularFireStorage,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveStore(event: Event) {
    event.preventDefault();
    const store = this.form.value;
    this.storesService.createStore(store)
      .subscribe(() => {
        this.router.navigate(['/super-admin/create-store']);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = `store-${this.date}.png`;
    const fileRef = this.angularFireStorage.ref(name);
    const task = this.angularFireStorage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();
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
    });
  }

}
