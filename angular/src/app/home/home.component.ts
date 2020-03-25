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

  // Voir si role de l'utilisateur = Admin
  show() {
    return this.session.user.role === 'admin';
  }

  get isLogin() {
    return this.session.user !== null && this.session.user.id !== null;
  }

  // se déconnecter
  disconnect() {
    //supprimer la session de connexion
    this.session.doSignOut();
    
    //diriger l'utilisateur vers le repertoire /home/(login)
    this.router.navigate(['/home']);
  }
}
