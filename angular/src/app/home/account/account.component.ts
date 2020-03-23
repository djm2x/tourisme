import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/models';
import { UowService } from 'src/app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/loader/snack-bar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  myForm: FormGroup;
  o = new User();
  id = '';
  isEdit = false;

  // Constructeur faisant appelle au composants du formulaire, du service session et au routeur
  constructor(private fb: FormBuilder, private route: ActivatedRoute
    , private uow: UowService, public snackBar: SnackBarService
    , private session: SessionService, private router: Router) { }


  ngOnInit(): void {
    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');


    if (this.id !== 'new') {
      this.isEdit = true,
        this.uow.users.getOne(this.session.user.id).subscribe(r => {
          this.o = r as any;
          this.createForm();
        });
    }

  }

  // Fonction permettant inserer les données dans les inputs
  createForm() {

    this.myForm = this.fb.group({
      id: this.o.id,
      lastname: [this.o.lastname, [Validators.required]],
      firstname: [this.o.firstname, [Validators.required]],
      email: [this.o.email, [Validators.required]],
      password: [this.o.password, [Validators.required]],
      role: [this.o.role, [Validators.required]]
    })
  }

  // Bouton de validation
  submit(modelUser: User) {

    if (!this.isEdit) {

      this.uow.users.post(modelUser).subscribe(r => {
        this.router.navigate(['/home/list']);
      });

    } else {
      // Modification des données user
      this.uow.users.put(modelUser.id, modelUser).subscribe(r => {
        this.session.updateUser(modelUser);
        this.o = modelUser;
        // retour à la liste des parcours
        this.snackBar.notifyOk(200, 'Modification enregistrer avec succès');
        // this.router.navigate(['/home/list']);
      })
        ;
    }


  }



}
