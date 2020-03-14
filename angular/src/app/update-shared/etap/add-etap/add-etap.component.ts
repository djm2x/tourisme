
import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etap } from 'src/app/Models/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-etap',
  templateUrl: './add-etap.component.html',
  styleUrls: ['./add-etap.component.scss']
})
export class AddEtapComponent implements OnInit, AfterViewInit {

  myForm: FormGroup;
  o: Etap;
  title = '';

  currentPosition = new EventEmitter();
  eventFromMap = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    console.log(this.o)
    this.createForm();
    if (this.o.id) {
      setTimeout(() => this.currentPosition.next({ lat: this.o.lat, lng: this.o.lng }), 50)
    } else {
      setTimeout(() => this.currentPosition.next({ lat: 48.86, lng: 2.39 }), 50);
    }

    this.eventFromMap.subscribe(r => {
      this.myForm.get('lat').setValue(r.lat);
      this.myForm.get('lng').setValue(r.lng);
    })
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

