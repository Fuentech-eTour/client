import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidator } from './../../../utils/validators';

import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private angularFireStorage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id).subscribe(product => {
        this.form.patchValue(product);
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    const product = this.form.value;
    this.productsService.updateProduct(this.id, product)
    .subscribe((newProduct) => {
      this.router.navigate(['./admin/products']);
      console.log(newProduct);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, MyValidator.isPreciValid]],
      image: [''],
      description: ['', Validators.required]
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = `image-${this.id}.png`;
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

  get priceField() {
    return this.form.get('price');
  }

}
