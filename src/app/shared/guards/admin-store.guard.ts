import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { LoginUserStoreComponent } from '../../auth/components/login-user-store/login-user-store.component';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminStoreGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.loggedInStore()) {
        return true;
      }
      const dialogRef = this.dialog.open(LoginUserStoreComponent, {
        width: 'auto'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/stores']);
      });
      return false;
  }

}
