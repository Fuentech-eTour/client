import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { WindowService } from '@core/services/window.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  userName: string;
  idStore: string;
  isLoading$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private windowService: WindowService,
    ) {
      this.userName = this.authService.getUserName();
      this.isLoading$ = this.windowService.isloading$;
      this.idStore = this.authService.getIdStore();
    }

    logout() {
      this.windowService.addUserName(null);
      this.authService.logout();
    }

}
