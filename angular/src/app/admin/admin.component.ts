import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public session: SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  disconnect() {
    this.session.doSignOut();
    this.router.navigate(['/home']);
  }

}
