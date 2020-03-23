import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastRouteService {
  public previousUrl = `/home`;
  constructor(private router: Router) { 
    this.last2()
  }

  last() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof RoutesRecognized),
      pairwise(),
      map((e: RoutesRecognized[]) => `${window.origin}${e[0].urlAfterRedirects}`)
    )
    .toPromise();
  }

  last2() {
    this.router.events.pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise()).subscribe((e: RoutesRecognized[]) => {
      this.previousUrl = `${e[0].urlAfterRedirects}`;
      console.log(this.previousUrl);
    });
  }
}
