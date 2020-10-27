import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StoresService } from '@core/services/stores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-store',
  templateUrl: './sidebar-store.component.html',
  styleUrls: ['./sidebar-store.component.scss']
})
export class SidebarStoreComponent implements OnInit {

  @Input() store: Observable<any>;
  store$: Observable<any>;
  private configStore = new BehaviorSubject<any>({});
  configStore$ = this.configStore.asObservable();

  private categoriasProductos = new BehaviorSubject<[]>([]);
  categoriasProductos$ = this.categoriasProductos.asObservable();
  private qualificationStore = new BehaviorSubject<number>(0);
  qualificationStore$ = this.qualificationStore.asObservable();
  colorHover1 = '0';
  colorHover2 = '0';
  colorHover3 = '0';
  colorHover4 = '0';
  colorHover5 = '0';

  constructor(
    private storesService: StoresService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.store$ = this.storesService.getTagsOneStore(this.store[0].id);
    this.store$.subscribe((store: any) => {
      this.categoriasProductos.next(store[0].tags);
    });
    this.fetchConfigStore();
    this.fetchQualificationStore();
  }

  fetchConfigStore() {
    this.storesService.getConfigStoreById(this.store[0].id).subscribe((data: any) => {
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

  fetchQualificationStore() {
    this.storesService.getQualificationStore(this.store[0].id).subscribe(({ puntuacion }: any) => {
      console.log(puntuacion);
      if (puntuacion !== 'Aun no tiene puntuacion') {
        this.qualificationStore.next(puntuacion);
      } else {
        this.qualificationStore.next(-1);
      }
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
    this.storesService.addQualificationStore(this.store[0].id, quantity)
    .subscribe(({ message }: any) => {
      this.openSnackBar(message);
      this.fetchQualificationStore();
    });
  }

}
