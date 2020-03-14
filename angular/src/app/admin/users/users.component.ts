import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { UowService } from 'src/app/services/uow.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/models';
import { MatPaginator } from '@angular/material/paginator';
import { merge } from 'rxjs';

enum PageTile {
  LIST = 'LIST',
  CREATED = 'CREATED',
  FOLLOWED = 'FOLLOWED'
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

// Declaration de la classe UsersComponent
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() pageTitle = PageTile.LIST;
  //list: User[] = [];
  o = new User();
  //resultat: User[] = [];
  resultat = {};
  myForm: FormGroup;
  isLoadingResults = false;
  resultsLength = 0;

  constructor(private fb: FormBuilder, private uow: UowService) { }

  ngOnInit(): void {
    this.createForm();
    this.getPage(0, 6, 'id', 'desc')


    merge(...[this.paginator.page]).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          'id',
          'desc'
        );
      }
    );





  }

  // Lecture des utilisateurs

  getPage(startIndex, pageSize, sortBy, sortDir) {

      this.isLoadingResults = true;
      this.uow.users.getAll(startIndex, pageSize, sortBy, sortDir).subscribe(
        (r: any) => {
          console.log(r);
          this.resultat = r[0];
          this.resultsLength = r[1];
        });
  }

  // Suppression d'un utilisateur
  delete(id) {

    this.uow.users.delete(id).subscribe(r => {
      this.getPage(0, 5, 'id', 'asc')
    });
  }

  // insertion des utilisateur dans les champs html
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

}
