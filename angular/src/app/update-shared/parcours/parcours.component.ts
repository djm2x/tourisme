
import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UowService } from 'src/app/services/uow.service';
import { SnackBarService } from 'src/app/loader/snack-bar.service';
import { Parcours } from 'src/app/Models/models';
import { SessionService } from 'src/app/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss']
})
export class ParcoursComponent implements OnInit {

  myForm: FormGroup;
  o = new Parcours();
  id = 0;
  sendObjectToEtapComponent = new EventEmitter();

  currentPosition = new EventEmitter();
  eventFromMap = new EventEmitter();


  // unites = this.uow.unites.getJson();
  constructor(private route: ActivatedRoute, private snack: SnackBarService
    , public uow: UowService, private fb: FormBuilder, private session: SessionService
    , private router: Router) { }

  ngOnInit() {

    this.createForm();

    this.route.params.subscribe((params) => {
      console.log(params.id);
      // this.id = +this.route.snapshot.paramMap.get('id');

      this.id = +params.id;
      if (this.id !== 0) {
        this.uow.parcours.getOne(this.id).subscribe(r => {
          this.o = r as any;
          // console.log(this.o);
          this.createForm();
          this.sendObjectToEtapComponent.next(this.o);
          this.currentPosition.next({ lat: this.o.lat, lng: this.o.lng });
        });
      } else {
        this.o = new Parcours();
        this.createForm();
        this.sendObjectToEtapComponent.next(this.o);
        this.currentPosition.next({ lat: 48.86, lng: 2.39 });
      }

    });
    // this.createCommandeForm();

    this.eventFromMap.subscribe(r => {
      this.myForm.get('lat').setValue(r.lat);
      this.myForm.get('lng').setValue(r.lng);
    })
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      titre: [this.o.titre, Validators.required],
      image: [this.o.image, Validators.required],
      descriptif: [this.o.descriptif, Validators.required],
      temps: [this.o.temps, Validators.required],
      lat: [this.o.lat, Validators.required],
      lng: [this.o.lng, Validators.required],
    });
  }

  async submit(o: Parcours) {
    // this.o = o;
    // return
    // return;
    if (this.id === 0) {
      this.uow.parcours.post(o).subscribe(async (r) => {
        // this.router.navigate(['/admin/Parcours/list']);
        this.o = r;
        this.sendObjectToEtapComponent.next(this.o);
      });
    } else {
      this.uow.parcours.put(o.id, o).subscribe(async r => {
        // this.snack.notifyOk('Parcours est bien enregitrer');
        // this.router.navigate(['/admin/Parcours/list']);
        // this.o = r;
        // this.sendObjectToEtapComponent.next(this.o);
      });
    }
  }


}

