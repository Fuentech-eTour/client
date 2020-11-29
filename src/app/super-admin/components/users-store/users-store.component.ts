import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from '@core/services/stores.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-users-store',
  templateUrl: './users-store.component.html',
  styleUrls: ['./users-store.component.scss']
})
export class UsersStoreComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['DI', 'Nombre', 'Acciones'];
  private isloading = new BehaviorSubject<boolean>(true);
  isloading$ = this.isloading.asObservable();
  private users = new BehaviorSubject<any>([]);
  users$ = this.users.asObservable();
  nameStore: any;

  constructor(
    private snackBar: MatSnackBar,
    private storesService: StoresService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
   }

   ngOnInit(): void {
    this.fetchStores();
  }

  fetchStores() {
    this.route.params.subscribe((params: Params) => {
      this.nameStore = params.razonsocial;
      this.isloading.next(true);
      this.storesService.getUsersStore(params.id).subscribe(data => {
        this.isloading.next(false);
        this.users.next(data);
      });
    });
  }

  inactivateUser(iduser: number): void {
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '300px',
      data: { message: '¿desea eliminar este usuario?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SI') {
        this.isloading.next(true);
        // logica para inactivar usuario tipo tienda
      }
    });
  }

  addInfoUserStore(userStore: any) {
    this.storesService.dataUserStore(userStore);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
