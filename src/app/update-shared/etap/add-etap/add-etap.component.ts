
import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etap } from 'src/app/Models/models';

@Component({
  selector: 'app-add-etap',
  templateUrl: './add-etap.component.html',
  styleUrls: ['./add-etap.component.scss']
})
export class AddEtapComponent implements OnInit, AfterViewInit {

  myForm: FormGroup;
  o: Etap;
  title = '';

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    console.log(this.o)
    this.createForm();
  }

  ngAfterViewInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: Etap): void {
    if (o.id === null) {
      this.uow.etaps.post(o).subscribe(r => {
        this.dialogRef.close(o);
      });
    } else {
      this.uow.etaps.put(o.id, o).subscribe(r => {
        this.dialogRef.close(o);
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      adresse: [this.o.adresse, Validators.required],
      lat: [this.o.lat, Validators.required],
      lng: [this.o.lng, Validators.required],
      parcoursId: [this.o.parcoursId, Validators.required],
    });
  }

  resetForm() {
    this.o = new Etap();
    this.createForm();
  }

}

