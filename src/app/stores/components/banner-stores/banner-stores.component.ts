import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '../../../core/models/store.model';

import { StoresService } from './../../../core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { CommentsStoreComponent } from '../comments-store/comments-store.component';

import Swiper from 'swiper';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { BusinessHoursComponent } from '../business-hours/business-hours.component';

@Component({
  selector: 'app-banner-stores',
  templateUrl: './banner-stores.component.html',
  styleUrls: ['./banner-stores.component.scss']
})
export class BannerStoresComponent implements OnInit, AfterViewInit {

  @Input() store: Store;

  private comments = new BehaviorSubject<[]>([]);
  comments$ = this.comments.asObservable();

  form: FormGroup;
  favoriteStores$: Observable<any>;
  estadoHover = false;
  showFiller = false;
  subscribeBtn = false;
  stateSpinner = false;
  mySwiper: Swiper;
  showComment = false;
  availabilityStore: boolean;
  private stateLoading = new BehaviorSubject<boolean>(true);
  stateLoading$ = this.stateLoading.asObservable();
  private stateComment = new BehaviorSubject<boolean>(true);
  stateComment$ = this.stateComment.asObservable();
  idClient: Observable<any>;
  idCommentEdit = -1;
  private qualificationStore = new BehaviorSubject<number>(0);
  qualificationStore$ = this.qualificationStore.asObservable();
  private configStore = new BehaviorSubject<any>({});
  configStore$ = this.configStore.asObservable();
  businessHours: any[] = [];
  private currentBusinessHours = new BehaviorSubject<any>({});
  currentBusinessHours$ = this.currentBusinessHours.asObservable();
  colorHover1 = '0';
  colorHover2 = '0';
  colorHover3 = '0';
  colorHover4 = '0';
  colorHover5 = '0';

  constructor(
    private storesService: StoresService,
    private windowService: WindowService,
    private bottomSheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.favoriteStores$ = this.storesService.favoriteStores$;
    this.buildForm();
    this.idClient = this.windowService.idClient$;
   }

  ngOnInit(): void {
    this.fetchConfigStore();
    this.fetchConfigBusinessHours();
    this.getFavoriteStores();
    this.fetchQualificationStore();
    this.fetchAvailabilityStore();
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 1,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }

  fetchAvailabilityStore() {
    this.storesService.getAvailabilityStoreById(this.store.id)
    .subscribe((res: any) => {
      console.log(res);
      if (res.message === 'Cerrado') {
        this.availabilityStore = false;
      }
      if (res.message === 'Abierto') {
        this.availabilityStore = true;
      }
    });
  }

  fetchConfigStore() {
    this.storesService.getConfigStoreById(this.store.id).subscribe((data: any) => {
      const dateInit = new Date('2020-01-01T' + data.horaini);
      const dateFinal = new Date('2020-01-01T' + data.horafin);
      const schedule = {
        timeInit: dateInit,
        timeFinal: dateFinal,
        valueMin: data.valormin,
      };
      this.configStore.next(schedule);
    });
  }

  fetchConfigBusinessHours() {
    this.storesService.getConfigBusinessHours(this.store.id)
    .subscribe((res: any) => {
      if (res.status === 402) {
        return;
      }
      for (const hours of res) {
        hours.horaini = new Date('2020-01-01T' + hours.horaini);
        hours.horafin = new Date('2020-01-01T' + hours.horafin);
        // this.currentBusinessHours.next(hours);
        this.businessHours.push(hours);
      }
      const currentDay = new Date().getDay();
      for (const hours of res) {
        if (hours.idutdays === currentDay) {
          this.currentBusinessHours.next(hours);
          break;
        }
      }
    });
  }

  getFavoriteStores() {
    this.favoriteStores$.subscribe((stores: any) => {
      if (Array.isArray(stores)) {
        const validation = stores.filter(store => store.id === this.store.id);
        if (validation.length > 0) {
          this.subscribeBtn = true;
        } else {
          this.subscribeBtn = false;
        }
      }
    });
  }

  fetchCommentStore() {
    this.storesService.getCommentStore(this.store.id).subscribe((res: any) => {
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

  mouseEnter() {
    this.estadoHover = true;
  }

  mouseLeave() {
   this.estadoHover = false;
  }

  subscribe(idstore: number) {
    this.windowService.session$.subscribe(rol => {
      if (rol === 'isClient') {
        this.stateSpinner = true;
        this.storesService.subscriptionStore({idtienda: idstore}).subscribe((res: any) => {
          this.stateSpinner = false;
          if (res.status === 'OK' || res.status === 'Ok') {
              this.subscribeBtn = !this.subscribeBtn;
          }
        });
      }
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(CommentsStoreComponent, {
      data: { idstore: this.store.id },
    });
  }

  sendComment(comment: any) {
    if (comment !== '') {
      this.windowService.session$.subscribe(session => {
        if (session === 'isClient') {
          this.storesService.createCommentStore(this.store.id, {comentario: comment})
            .subscribe((res: any) => {
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

  changeShowComment() {
    this.showComment = !this.showComment;
    this.fetchCommentStore();
  }

  openDialogBusinessHours(): void {
    const dialogRef = this.dialog.open(BusinessHoursComponent, {
      width: '300px',
      data: this.businessHours,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  selectCal1() {
    this.colorHover1 = '1';
  }
  selectCal2() {
    this.colorHover1 = '1';
    this.colorHover2 = '2';
  }
  selectCal3() {
    this.colorHover1 = '1';
    this.colorHover2 = '2';
    this.colorHover3 = '3';
  }
  selectCal4() {
    this.colorHover1 = '1';
    this.colorHover2 = '2';
    this.colorHover3 = '3';
    this.colorHover4 = '4';
  }
  selectCal5() {
    this.colorHover1 = '1';
    this.colorHover2 = '2';
    this.colorHover3 = '3';
    this.colorHover4 = '4';
    this.colorHover5 = '5';
  }

  offSelectCal() {
    this.colorHover1 = '0';
    this.colorHover2 = '0';
    this.colorHover3 = '0';
    this.colorHover4 = '0';
    this.colorHover5 = '0';
  }

  sendQualification(quantity: number) {
    this.colorHover1 = '0';
    this.colorHover2 = '0';
    this.colorHover3 = '0';
    this.colorHover4 = '0';
    this.colorHover5 = '0';
    this.storesService.addQualificationStore(this.store.id, quantity)
    .subscribe(({ message }: any) => {
      this.openSnackBar(message);
      this.fetchQualificationStore();
    });
  }

  fetchQualificationStore() {
    this.storesService.getQualificationStore(this.store.id).subscribe(({ puntuacion }: any) => {
      if (puntuacion !== 'Aun no tiene puntuacion') {
        this.qualificationStore.next(puntuacion);
      } else {
        this.qualificationStore.next(-1);
      }
    });
  }
}
