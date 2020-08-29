import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { StoresService } from '@core/services/stores.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-comments-store',
  templateUrl: './comments-store.component.html',
  styleUrls: ['./comments-store.component.scss']
})
export class CommentsStoreComponent implements OnInit {

  stateComment = true;
  stateLoading = true;
  form: FormGroup;
  private comments = new BehaviorSubject<[]>([]);
  comments$ = this.comments.asObservable();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CommentsStoreComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private storesService: StoresService,
    private formBuilder: FormBuilder,
  ) {
    this.bottomSheetRef.afterOpened();
    this.buildForm();
    this.fetchCommentStore();
   }

  ngOnInit(): void {
  }

  fetchCommentStore() {
    this.storesService.getCommentStore(this.data.idstore).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'Empty') {
        this.stateComment = false;
        this.stateLoading = false;
      } else {
        this.stateComment = true;
        this.stateLoading = false;
        this.comments.next(res);
      }
    });
  }

  sendComment(comment: any) {
    if (comment !== '') {
      this.storesService.createCommentStore(this.data.idstore, {comentario: comment}).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.fetchCommentStore();
          this.form.reset();
        }
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      comentario: [''],
    });
  }

}
