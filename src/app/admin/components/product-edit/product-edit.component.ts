import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from '@core/services/products/products.service';
import { AuthService } from '@core/services/auth.service';
import { TagsService } from '@core/services/tags.service';
import { WindowService } from '@core/services/window.service';
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
  tags: [];
  id: number;
  codigo: string;
  image$: Observable<any>;
  date = new Date().toString().split(' ').join('');
  title: string;
  price: number;
  description: string;
  image: any;
  newImage: any;
  file: any;
  fileRef: any;
  task: any;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private authService: AuthService,
    private tagsService: TagsService,
    private windowService: WindowService,
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
        console.log(product);
        this.form.patchValue(product[0]);
        this.codigo = product[0].codigo;
        this.title = product[0].nombrearticulo;
        this.price = product[0].valorventa;
        this.description = product[0].descripcion;
        this.image = product[0].imagen;
        this.form.get('tags').setValue(product[0].idtag);
      });
    });
    this.tagsService.getAllTagsProducts().subscribe(tags => {
      this.tags = tags;
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    this.windowService.loadingTrue();
    const nameStore = this.authService.getUserName().toString().split(' ').join('');
    const file = this.file;
    if (file) {
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
            const codigo = 'codigo';
            product[codigo] = this.codigo;
            this.productsService.updateProduct(product)
              .subscribe((res: any) => {
                console.log(res);
                this.windowService.loadingFalse();
                // se debe crear un metodo para modificar el tag asignado a un producto
                /* if (res.status === 'Ok') {
                  this.windowService.loadingTrue();
                  const idTag = this.form.get('tags').value;
                  const idp = res.idproducto;
                  console.log(idTag, idp);
                  this.productsService.addTagProduct(idp, {idt: idTag}).subscribe(resul => {
                    console.log(resul);
                    this.windowService.loadingFalse();
                    this.router.navigate(['./admin/products']);
                  });
                } */
              });
          });
        })
      )
      .subscribe();
    } else {
      this.windowService.loadingTrue();
      const product = this.form.value;
      const codigo = 'codigo';
      product[codigo] = this.codigo;
      console.log(product);
      this.productsService.updateProduct(product)
      .subscribe((res: any) => {
        console.log(res);
        this.windowService.loadingFalse();
        // se debe crear un metodo para modificar el tag asignado a un producto
        /* if (res.status === 'Ok') {
          this.windowService.loadingTrue();
          const idTag = this.form.get('tags').value;
          const idp = res.idproducto;
          console.log(idTag, idp);
          this.productsService.addTagProduct(idp, {idt: idTag}).subscribe(resul => {
            console.log(resul);
            this.windowService.loadingFalse();
            this.router.navigate(['./admin/products']);
          });
        } */
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      codigo: [{value: '', disabled: true}, Validators.required],
      nombrearticulo: ['', Validators.required],
      valorcompra: 0,
      ivacompra: 0,
      ivaventa: 0,
      valorventa: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  uploadFile(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.newImage = reader.result;
      this.form.get('imagen').setValue('url');
    };
  }

  get priceField() {
    return this.form.get('valorventa');
  }
}
