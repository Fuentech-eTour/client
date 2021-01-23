import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StoresService } from '@core/services/stores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessHoursComponent } from '../business-hours/business-hours.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar-store',
  templateUrl: './sidebar-store.component.html',
  styleUrls: ['./sidebar-store.component.scss']
})
export class SidebarStoreComponent implements OnInit {

  @Input() store: Observable<any>;
  @Output() addTag = new EventEmitter<any>();
  store$: Observable<any>;

  private categoriasProductos = new BehaviorSubject<[]>([]);
  categoriasProductos$ = this.categoriasProductos.asObservable();
  private qualificationStore = new BehaviorSubject<number>(0);
  qualificationStore$ = this.qualificationStore.asObservable();
  businessHours: any[] = [];
  availabilityStore: boolean;
  private currentBusinessHours = new BehaviorSubject<any>({});
  currentBusinessHours$ = this.currentBusinessHours.asObservable();
  colorHover1 = '0';
  colorHover2 = '0';
  colorHover3 = '0';
  colorHover4 = '0';
  colorHover5 = '0';

  constructor(
    private storesService: StoresService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchTagsOneStore();
    this.fetchAvailabilityStore();
    this.fetchConfigBusinessHours();
    this.fetchQualificationStore();
  }

  fetchTagsOneStore() {
    this.store$ = this.storesService.getTagsOneStore(this.store[0].id);
    this.store$.subscribe((store: any) => {
      this.categoriasProductos.next(store[0].tags);
    });
  }

  fetchAvailabilityStore() {
    this.storesService.getAvailabilityStoreById(this.store[0].id)
    .subscribe((res: any) => {
      if (res.message === 'Cerrado') {
        this.availabilityStore = false;
      }
      if (res.message === 'Abierto') {
        this.availabilityStore = true;
      }
    });
  }

  fetchConfigBusinessHours() {
    this.storesService.getConfigBusinessHours(this.store[0].id)
    .subscribe((res: any) => {
      if (res.status === 402) {
        return;
      }
      for (const hours of res) {
        hours.horaini = new Date('2020-01-01T' + hours.horaini);
        hours.horafin = new Date('2020-01-01T' + hours.horafin);
        this.currentBusinessHours.next(hours);
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

  fetchQualificationStore() {
    this.storesService.getQualificationStore(this.store[0].id).subscribe(({ puntuacion }: any) => {
      (puntuacion);
      if (puntuacion !== 'Aun no tiene puntuacion') {
        this.qualificationStore.next(puntuacion);
      } else {
        this.qualificationStore.next(-1);
      }
    });
  }

  openDialogBusinessHours(): void {
    const dialogRef = this.dialog.open(BusinessHoursComponent, {
      width: '300px',
      data: this.businessHours,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onAddTag(tag: any) {
    this.addTag.emit(tag);
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
    this.storesService.addQualificationStore(this.store[0].id, quantity)
    .subscribe(({ message }: any) => {
      this.openSnackBar(message);
      this.fetchQualificationStore();
    });
  }

}
