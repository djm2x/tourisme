import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/models';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: User;
  title = '';
  roles = ['user', 'admin'];
  hide = true;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
  , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: User): void {
    this.dialogRef.close(o);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      firstname: [this.o.firstname, Validators.required],
      lastname: [this.o.lastname, Validators.required],
      email: [this.o.email, [Validators.required, Validators.email]],
      password: [this.o.password, Validators.required],
      role: [this.o.role, Validators.required],
    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }

}
