
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { SessionService } from './shared';
import { MediaMatcher } from '@angular/cdk/layout';
import { routerTransition } from './shared/animations';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent implements OnInit {
  @ViewChild('btndev', { static: true }) btndev: MatButton;
  keyDevTools = '';
  panelOpenState = false;
  mobileQuery: MediaQueryList;
  currentSection = 'section1';
  userImg = '../../assets/caisse.jpg';
  opened = true;
  idRole = -1;
  isConnected = false;
  // montantCaisse = this.s.notify;
  route = this.router.url;
  constructor(private session: SessionService, changeDetectorRef: ChangeDetectorRef
    , media: MediaMatcher, public router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
  }

  ngOnInit() {


    this.getRoute();

  }

  get patchRoute() { return this.route.split('/'); }

  getRoute() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        this.route = route.url;
        console.log(this.route);
      }
    });
  }



  disconnect() {
    this.session.doSignOut();
    this.router.navigate(['/auth']);
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
