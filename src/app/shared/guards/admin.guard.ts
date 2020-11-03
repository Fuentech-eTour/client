import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../../auth/components/login/login.component';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* return this.authService.hasUser().pipe(
      map(user => user === null ? false : true),
      tap(hasUser => {
        if (!hasUser) {
          this.router.navigate(['/auth/login']);
        }
      }),
    ); */

    if (this.authService.loggedIn()) {
      return true;
    }
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/stores']);
    });
    return false;
  }

}
