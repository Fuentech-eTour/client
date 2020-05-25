import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidator } from './../../../utils/validators';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private angularFireStorage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event) {
    event.preventDefault();
    const product = this.form.value;
    this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        this.router.navigate(['./admin/products']);
        console.log(newProduct);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file);
    const name = `image-${this.date}.png`;
    console.log(file);
    const fileRef = this.angularFireStorage.ref(name);
    const task = this.angularFireStorage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, MyValidator.isPreciValid]],
      image: [''],
      description: ['', Validators.required]
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}
