import { MatSnackBar } from '@angular/material/snack-bar';

export class Message {

    openSnackBar(matSnackBar: MatSnackBar, message: string) {
        matSnackBar.open(message, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
    }
}
