import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage } from "angularfire2/storage";
import { MatAccordion } from "@angular/material/expansion";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateStore, Days } from "@core/models/store.model";
import { TagsService } from "@core/services/tags.service";
import { BehaviorSubject, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { StoresService } from "@core/services/stores.service";
import { AuthService } from "@core/services/auth.service";

@Component({
  selector: "app-store-settings",
  templateUrl: "./store-settings.component.html",
  styleUrls: ["./store-settings.component.scss"],
})
export class StoreSettingsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  private isloadingLogo = new BehaviorSubject<boolean>(false);
  isloadingLogo$ = this.isloadingLogo.asObservable();
  private isloadingCategory = new BehaviorSubject<boolean>(false);
  isloadingCategory$ = this.isloadingCategory.asObservable();
  private isloadingPriceConfig = new BehaviorSubject<boolean>(false);
  isloadingPriceConfig$ = this.isloadingPriceConfig.asObservable();
  private isloadingBusinessHours = new BehaviorSubject<boolean>(false);
  isloadingBusinessHours$ = this.isloadingBusinessHours.asObservable();

  formLogo: FormGroup;
  formCategory: FormGroup;
  formPriceConfig: FormGroup;
  formBusinessHours: FormGroup;
  idStore = parseInt(this.authService.getIdStore(), 10);
  date = new Date().getTime();
  image$: Observable<any>;
  image: any;
  file: any;
  tagsStore: any;
  days: Days[] = [
    { id: 1, name: "Lunes", initials: "Lu" },
    { id: 2, name: "Martes", initials: "Ma" },
    { id: 3, name: "Miércoles", initials: "Mi" },
    { id: 4, name: "Jueves", initials: "Ju" },
    { id: 5, name: "Viernes", initials: "Vi" },
    { id: 6, name: "Sábado", initials: "Sa" },
    { id: 7, name: "Domingo", initials: "Do" },
  ];
  catExitst: boolean;
  idTagC:number;

  constructor(
    private snackBar: MatSnackBar,
    private tagsService: TagsService,
    private storesService: StoresService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private angularFireStorage: AngularFireStorage
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    this.fetchOnestore();
    this.fecthCategoryStore();
    this.fetchAllTagsStore();
    this.fetchConfigStore();
    this.fetchConfigBusinessHours();
  }

  fetchOnestore() {
    this.storesService.getOneStores(this.idStore).subscribe((store) => {
      this.image = store[0].imagen;
      this.formLogo.patchValue(store[0]);
      this.formLogo.get("imagen").setValue("");
    });
  }

  fecthCategoryStore() {
    this.storesService.getCategoryOfStore(this.idStore).subscribe((res) => {
      console.log(res);
      if (res.status === "200") {
        this.catExitst = true;
        this.idTagC=res.data[0].id;
        const tag = {
          iduttagstores: res.data[1].iduttagstores,
        };
        this.formCategory.patchValue(tag);
      } else if (res.status === "404") {
        this.catExitst = false;
      }
    });
  }

  fetchAllTagsStore() {
    this.tagsService.getAllTagsStores().subscribe((data) => {
      this.tagsStore = data;
    });
  }

  fetchConfigStore() {
    this.storesService.getConfigStoreById(this.idStore).subscribe((data) => {
      this.formPriceConfig.patchValue(data);
    });
  }

  fetchConfigBusinessHours() {
    this.storesService
      .getConfigBusinessHours(this.idStore)
      .subscribe((data: any) => {
        if (data.status === 402) {
          return;
        } else {
          for (const hours of data) {
            if (hours.horaini !== "00:00:00" && hours.horafin !== "00:00:00") {
              this.formBusinessHours
                .get(`horaini${hours.idutdays}`)
                .setValue(hours.horaini);
              this.formBusinessHours
                .get(`horafin${hours.idutdays}`)
                .setValue(hours.horafin);
            }
          }
        }
      });
  }

  uploadFile(event) {
    if (event.target.files.length === 0) {
      return;
    }
    if (event.target.files[0].size > 1000000 * 5) {
      this.openSnackBar("El tamaño de la imagen supera los 5Mb");
      return;
    }
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.image = reader.result;
      this.formLogo.get("imagen").setValue("url");
    };
  }

  saveLogo(event) {
    event.preventDefault();
    this.isloadingLogo.next(true);
    if (this.formLogo.valid) {
      const nameStore = this.formLogo
        .get("razonsocial")
        .value.toString()
        .split(" ")
        .join("");
      const file = this.file;
      const name = `store-${nameStore}-${this.date}.jpg`;
      const fileRef = this.angularFireStorage.ref(name);
      const task = this.angularFireStorage.upload(name, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.image$ = fileRef.getDownloadURL();
            this.image$.subscribe((url) => {
              const newUrl = url.replace(".jpg", "_500x500.jpg");
              this.formLogo.get("imagen").setValue(newUrl);
              const store: CreateStore = this.formLogo.value;
              this.storesService
                .updateOneStoresByUser(store)
                .subscribe((res: any) => {
                  this.isloadingLogo.next(false);
                  this.openSnackBar(res.message);
                });
            });
          })
        )
        .subscribe();
    }
  }

  credCategory(event) {
    event.preventDefault();
    /* if (!this.catExitst) {
      this.isloadingCategory.next(true);
      const idTag = parseInt(this.formCategory.get("idtag").value, 10);
      this.storesService.assingTagStoreByUser(idTag).subscribe((res: any) => {
        this.isloadingCategory.next(false);
        this.openSnackBar(res.message);
        if (res.status === "Ok") {
        }
      });
    } else {
      this.storesService
      console.log(this.formCategory.value)
      const idTag = this.formCategory.get("iduttagstores").value;
      console.log({ idtagtienda: this.idTagC, nuevotag: idTag });
      this.storesService
        .editTagStore({ idtagtienda: this.idTagC, nuevotag: idTag })
        .subscribe((res: any) => {
          this.isloadingCategory.next(false);
          this.openSnackBar(res.message);
          if (res.status === "Ok") {
          }
        });
    } */
    if (!this.catExitst) {
      this.createCategory(event);
    } else {
      this.editCategory(event);
    }
  }

  createCategory(event) {
    event.preventDefault();
    this.isloadingCategory.next(true);
    const idTag = parseInt(this.formCategory.get("iduttagstores").value, 10);
    this.storesService.assingTagStoreByUser(idTag).subscribe((res: any) => {
      this.isloadingCategory.next(false);
      this.openSnackBar(res.message);
      if (res.status === "Ok") {
      }
    });
  }

  editCategory(event) {
    event.preventDefault();
    const idTag = this.formCategory.get("iduttagstores").value;
    this.storesService
      .editTagStore({ idtagtienda: this.idTagC , nuevotag: idTag })
      .subscribe((res: any) => {
        this.isloadingCategory.next(false);
        this.openSnackBar(res.message);
        if (res.status === "Ok") {
        }
      });
  }

  createPriceConfig(event) {
    event.preventDefault();
    this.isloadingPriceConfig.next(true);
    const config = {
      valormin: this.formPriceConfig.get("valormin").value,
      valordomicilio: this.formPriceConfig.get("valordomicilio").value,
    };
    this.storesService.assingConfigStoreByUser(config).subscribe((res: any) => {
      this.isloadingPriceConfig.next(false);
      this.openSnackBar(res.message);
      if (res.status === "Ok" || res.status === "OK") {
      }
    });
  }

  createBusinessHours(event) {
    event.preventDefault();
    const businessHours: any[] = [];
    for (const hours of this.days) {
      if (
        this.formBusinessHours.get(`horaini${hours.id}`).value !== " " &&
        this.formBusinessHours.get(`horafin${hours.id}`).value !== " "
      ) {
        // tslint:disable-next-line: no-shadowed-variable
        const objectBusinessHours = {
          idday: hours.id,
          horaini: this.formBusinessHours.get(`horaini${hours.id}`).value,
          horafin: this.formBusinessHours.get(`horafin${hours.id}`).value,
        };
        businessHours.push(objectBusinessHours);
      } else {
        this.formBusinessHours.get(`horaini${hours.id}`).setValue("00:00:00");
        this.formBusinessHours.get(`horafin${hours.id}`).setValue("00:00:00");
        const horaini = this.formBusinessHours.get(`horaini${hours.id}`).value;
        const horafin = this.formBusinessHours.get(`horafin${hours.id}`).value;
        // tslint:disable-next-line: no-shadowed-variable
        const objectBusinessHours = {
          idday: hours.id,
          horaini,
          horafin,
        };
        businessHours.push(objectBusinessHours);
      }
    }
    for (const hours of businessHours) {
      this.isloadingBusinessHours.next(true);
      this.storesService
        .createConfigBusinessHoursByUser(hours)
        .subscribe((res: any) => {
          this.isloadingBusinessHours.next(false);
          this.openSnackBar(res.message);
        });
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, "Cerrar", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  builForm() {
    this.formLogo = this.formBuilder.group({
      tipodoc: ["", [Validators.required]],
      identificacion: ["", [Validators.required]],
      digito: ["", [Validators.required]],
      razonsocial: ["", [Validators.required]],
      tipo: ["", [Validators.required]],
      idutmunicipality: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      email: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      regimen: ["", [Validators.required]],
      zona: ["", [Validators.required]],
      digitoclave: ["", [Validators.required]],
      imagen: ["", [Validators.required]],
    });
    this.formCategory = this.formBuilder.group({
      iduttagstores: ["", Validators.required],
    });
    this.formPriceConfig = this.formBuilder.group({
      valormin: ["", Validators.required],
      valordomicilio: ["", Validators.required],
    });
    this.formBusinessHours = this.formBuilder.group({
      horaini1: [" ", Validators.required],
      horafin1: [" ", Validators.required],
      horaini2: [" ", Validators.required],
      horafin2: [" ", Validators.required],
      horaini3: [" ", Validators.required],
      horafin3: [" ", Validators.required],
      horaini4: [" ", Validators.required],
      horafin4: [" ", Validators.required],
      horaini5: [" ", Validators.required],
      horafin5: [" ", Validators.required],
      horaini6: [" ", Validators.required],
      horafin6: [" ", Validators.required],
      horaini7: [" ", Validators.required],
      horafin7: [" ", Validators.required],
    });
  }
}
