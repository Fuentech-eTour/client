import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '../../../core/models/store.model';

import { CartService } from './../../../core/services/cart.service';
import { StoresService } from './../../../core/services/stores.service';
import { WindowService } from '@core/services/window.service';
import { CommentsStoreComponent } from '../comments-store/comments-store.component';

import Swiper from 'swiper';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  colorHover1 = '0';
  colorHover2 = '0';
  colorHover3 = '0';
  colorHover4 = '0';
  colorHover5 = '0';

  constructor(
    private cartService: CartService,
    private storesService: StoresService,
    private windowService: WindowService,
    private bottomSheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.favoriteStores$ = this.storesService.favoriteStores$;
    this.buildForm();
    this.idClient = this.windowService.idClient$;
   }

  ngOnInit(): void {
    this.fetchConfigStore();
    this.getFavoriteStores();
    this.fetchQualificationStore();
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

  addCart(id: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.store.products.length; i++) {
      if (this.store.products[i].id === id) {
        this.cartService.addCart(this.store.products[i]);
        this.cartService.addPrice(this.store.products[i].valorventa);
      }
    }
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
