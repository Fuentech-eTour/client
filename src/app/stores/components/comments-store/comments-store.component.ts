import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '@core/services/stores.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-comments-store',
  templateUrl: './comments-store.component.html',
  styleUrls: ['./comments-store.component.scss']
})
export class CommentsStoreComponent implements OnInit {

  form: FormGroup;
  private stateLoading = new BehaviorSubject<boolean>(true);
  stateLoading$ = this.stateLoading.asObservable();
  private stateComment = new BehaviorSubject<boolean>(true);
  stateComment$ = this.stateComment.asObservable();
  private comments = new BehaviorSubject<[]>([]);
  comments$ = this.comments.asObservable();
  idClient: Observable<any>;
  idCommentEdit = -1;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CommentsStoreComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private storesService: StoresService,
    private windowService: WindowService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.bottomSheetRef.afterOpened();
    this.buildForm();
    this.fetchCommentStore();
    this.idClient = this.windowService.idClient$;
   }

  ngOnInit(): void {
  }

  fetchCommentStore() {
    this.storesService.getCommentStore(this.data.idstore).subscribe((res: any) => {
      if (res.status === 'Empty') {
        this.stateComment.next(false);
      }
      if (res.length > 0) {
        this.stateComment.next(true);
        this.comments.next(res);
      }
      this.stateLoading.next(false);
    });
  }

  sendComment(comment: any) {
    if (comment !== '') {
      this.windowService.session$.subscribe(session => {
        if (session === 'isClient') {
          this.storesService.createCommentStore(this.data.idstore, {comentario: comment}).subscribe((res: any) => {
            if (res.status === 'OK') {
              this.fetchCommentStore();
              this.form.reset();
            }
          });
        }
      });
    }
  }

  editComment(currentComment: string, comment: string, idComment) {
    console.log(currentComment, comment, idComment);
    if (currentComment !== comment) {
      this.storesService.editOrInactivateComment(idComment, {comentario: comment, estado: 1})
        .subscribe((res: any) => {
          this.openSnackBar(res.message);
          if (res.status === 'Ok') {
            this.fetchCommentStore();
            this.idCommentEdit = -1;
          }
        });
    }
  }

  inactivateComment(currentComment: string, idComment) {
    this.storesService.editOrInactivateComment(idComment, {comentario: currentComment, estado: 0})
      .subscribe((res: any) => {
        this.openSnackBar(res.message);
        if (res.status === 'Ok') {
          this.fetchCommentStore();
          this.idCommentEdit = -1;
          this.openSnackBar('Mensaje eliminado');
        }
      });
  }

  assignIdEditComment(idCommentEdit: number) {
    if (idCommentEdit === this.idCommentEdit) {
      this.idCommentEdit = -1;
      return;
    }
    this.idCommentEdit = idCommentEdit;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      comentario: [''],
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
