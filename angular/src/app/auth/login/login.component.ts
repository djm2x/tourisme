import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { User } from 'src/app/Models/models';
import { UowService } from 'src/app/services/uow.service';
import { SessionService } from 'src/app/shared';
import { SnackbarService } from 'src/app/shared/snakebar.service';
import { Location } from '@angular/common';
import { filter, pairwise, delay } from 'rxjs/operators';
import { LastRouteService } from './last-route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: anime
})
export class LoginComponent implements OnInit, OnDestroy {
  // for test
  displayedColumns: string[] = ['email', 'password', 'profil'];
  dataSource = [
    { email: 'mourabit@angular.io', password: '123', profil: 'Administrateur' },
    { email: 'mehdi@angular.io', password: '123', profil: 'Central' },
    { email: 'soufiane@angular.io', password: '123', profil: 'Point focal' },
    { email: 'ahmed@angular.io', password: '123', profil: 'Metier' },
  ];

  // end test
  myForm: FormGroup;
  o = new User();
  hide = true;
  previousUrl = `${window.origin}/home`;
  constructor(private fb: FormBuilder, private uow: UowService
    , private router: Router, public session: SessionService
    , private snackbar: SnackbarService, private route: LastRouteService) { }

  async ngOnInit() {

    // Valeur par default pour test
    this.o.email = 'admin@angular.io';
    this.o.password = '123';
    this.createForm();

  }

    // Formulaire à 2 champs
  createForm() {
    this.myForm = this.fb.group({
      email: [this.o.email, [Validators.required, Validators.email]],
      password: [this.o.password, [Validators.required]],
    });
  }

  get email() { return this.myForm.get('email'); }
  get password() { return this.myForm.get('password'); }

  get emailError() {
    return this.email.hasError('required') ? 'Vous devez entrer une valeur' :
      this.email.hasError('email') ? 'Email invalide' : '';
  }

  get passwordError() {
    return this.password.hasError('required') ? 'Vous devez entrer une valeur' : '';
  }

  submit(o: User) {
    
    this.uow.accounts.login(o).subscribe(async (r: any) => {
      
      this.session.doSignIn(r.user, r.token);


      // Si réussite alors aller vers /home
      this.router.navigate(['/home']);
    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
