import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsService } from '@core/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['Categoria', 'Acciones'];
  form: FormGroup;
  municipalities: any;
  private tagsStores = new BehaviorSubject<any>([]);
  tagsStores$ = this.tagsStores.asObservable();
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tagsService: TagsService,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.fetchAllTagsStore();
  }

  // tags products

  fetchAllTagsStore() {
    this.isloading.next(true);
    this.tagsService.getAllTagsStores().subscribe(data => {
      console.log(data);
      this.isloading.next(false);
      this.tagsStores.next(data);
    });
  }

  saveTag(event: Event) {
    const newTag = this.form.value;
    this.tagsService.createTagStore(newTag).subscribe((res: any) => {
      console.log(res);
      this.openSnackBar(res.message);
      if (res.status === 'OK' || res.status === 'Ok') {
        this.form.reset();
        this.fetchAllTagsStore();
      }
    });
  }

  deleteAddress(idTag: number) {
    this.tagsService.updateStateTag(idTag, 0).subscribe((res: any) => {
      console.log(res);
      this.openSnackBar(res.message);
      this.fetchAllTagsStore();
    });
  }

  // tags stores

  fetchAllTagsProduct() {
    this.isloading.next(true);
    this.tagsService.getAllTagsStores().subscribe(data => {
      console.log(data);
      this.isloading.next(false);
      this.tagsStores.next(data);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      tag: ['', Validators.required],
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openDialog(tag: any): void {
    const dialogRef = this.dialog.open(EditTagComponent, {
      width: '300px',
      data: { data: tag }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchAllTagsStore();
    });
  }

}

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class EditTagComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private tagsService: TagsService,
    ) {
      this.buildForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const { data } = this.data;
    this.form.patchValue(data);
  }

  editTag(event: Event) {
    const { data } = this.data;
    const updateTag = this.form.value;
    console.log(updateTag);
    this.tagsService.updateTagStore(data.id, updateTag.descripcion).subscribe((res: any) => {
      this.openSnackBar(res.message);
      if (res.status === 'OK' || res.status === 'Ok') {
        this.onNoClick();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
