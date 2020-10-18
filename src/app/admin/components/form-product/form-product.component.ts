import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';
import { TagsService } from '@core/services/tags.service';
import { WindowService } from '@core/services/window.service';
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
  tags: [];
  image$: Observable<any>;
  date = new Date().toString().split(' ').join('');
  title: string;
  price: number;
  description: string;
  image: any;
  file: any;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private authService: AuthService,
    private tagsService: TagsService,
    private windowService: WindowService,
    private router: Router,
    private angularFireStorage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.tagsService.getAllTagsProducts().subscribe((tags: any) => {
      this.tags = tags;
    });
    console.log(this.image);
  }

  saveProduct(event: Event) {
    event.preventDefault();
    this.windowService.loadingTrue();
    const nameStore = this.authService.getUserName().toString().split(' ').join('');
    const file = this.file;
    const name = `product-${nameStore}-${this.date}.png`;
    const fileRef = this.angularFireStorage.ref(name);
    const task = this.angularFireStorage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.windowService.loadingFalse();
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          this.windowService.loadingTrue();
          this.form.get('imagen').setValue(url);
          const product = this.form.value;
          this.productsService.createProduct(product)
            .subscribe((res: any) => {
              this.windowService.loadingFalse();
              if (res.status === 'Ok') {
                this.windowService.loadingTrue();
                const idTag = this.form.get('tags').value;
                const idp = res.idproducto;
                console.log(idTag, idp);
                this.productsService.addTagProduct(idp, {idt: idTag}).subscribe(resul => {
                  this.windowService.loadingFalse();
                  this.router.navigate(['./admin/products']);
                });
              }
            });
        });
      })
    )
    .subscribe();
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

  private buildForm() {
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombrearticulo: ['', Validators.required],
      valorcompra: 0,
      ivacompra: 0,
      ivaventa: 0,
      valorventa: ['', [Validators.required, /* MyValidator.isPreciValid */]],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  get priceField() {
    return this.form.get('valorventa');
  }

  /* uploadFile(event) {
    const nameStore = this.authService.getUserName().toString().split(' ').join('');
    const file = event.target.files[0];
    const name = `product-${nameStore}-${this.date}.png`;
    const fileRef = this.angularFireStorage.ref(name);
    const task = this.angularFireStorage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          this.form.get('imagen').setValue(url);
        });
      })
    )
    .subscribe();
  } */

}
