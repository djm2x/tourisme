import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today = new Date();
  constructor(public session: SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  show() {
    return this.session.user.role === 'admin';
  }

  get isLogin() {
    return this.session.user !== null && this.session.user.id !== null;
  }

  disconnect() {
    this.session.doSignOut();
    this.router.navigate(['/home']);
  }
}
