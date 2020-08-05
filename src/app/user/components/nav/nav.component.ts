import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WindowService } from '@core/services/window.service';
import { AuthService } from '@core/services/auth.service';

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
  nameUser$: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private windowService: WindowService,
    private authService: AuthService,
    ) {
      this.nameUser$ = windowService.userName$;
    }

    logout() {
      this.windowService.addUserName(null);
      this.authService.logout();
    }

}
