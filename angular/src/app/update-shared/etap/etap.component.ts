
import { Component, OnInit, ViewChild, EventEmitter, Input, Inject } from '@angular/core';
import { merge } from 'rxjs';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from 'src/app/components/delete/delete.service';
import { Parcours, Etap, Quizz } from 'src/app/Models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEtapComponent } from './add-etap/add-etap.component';
import { QuizzComponent } from '../quizz/quizz.component';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-etap',
  templateUrl: './etap.component.html',
  styleUrls: ['./etap.component.scss']
})
export class EtapComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  parentObject = new Parcours();
  @Input() objectFromParcoursComponent = new EventEmitter();
  myForm: FormGroup;
  update = new EventEmitter();
  o = new Etap();

  isLoadingResults = false;
  resultsLength = 0;
  isRateLimitReached = false;

  dataSource = [];
  columnDefs = [
    { columnDef: 'adresse', headName: '' },
    { columnDef: 'lat', headName: '' },
    { columnDef: 'lng', headName: '' },
    // { columnDef: 'titreAr', headName: '' },
    { columnDef: 'option', headName: 'OPTION' },
  ].map(e => {
    e.headName = e.headName === '' ? e.columnDef.toUpperCase() : e.headName;
    return e;
  });

  displayedColumns = this.columnDefs.map(e => e.columnDef);

  constructor(private uow: UowService, public dialog: MatDialog
    , private mydialog: DeleteService, @Inject('BASE_URL') private url: string
    , private fb: FormBuilder) { }

  ngOnInit() {
    this.objectFromParcoursComponent.subscribe(r => {
      this.parentObject = r;
      console.log(r)
      // this.getPage(0, 10, 'id', 'desc', this.parentObject.id);

      // console.log(this.parentObject)

      this.createForm();
      merge(...[this.sort.sortChange, this.paginator.page, this.update]).pipe(
        startWith(null as any),
        // tap(() => this.getPage(0, 10, 'id', 'desc', this.parentObject.id))
      ).subscribe(
        r => {
          r === true ? this.paginator.pageIndex = 0 : r = r;
          !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          console.log(this.parentObject.id)
          this.getPage(
            startIndex,
            this.paginator.pageSize,
            this.sort.active ? this.sort.active : 'id',
            this.sort.direction ? this.sort.direction : 'desc',
            this.parentObject.id,
          );
        }
      );
    });
  }

  get disableAdd() {
    return this.parentObject.id === null;
  }

  getPage(startIndex, pageSize, sortBy, sortDir, id) {
    this.isLoadingResults = true;
    this.uow.etaps.getAll(startIndex, pageSize, sortBy, sortDir, id).subscribe(
      (r: any) => {
        console.log(r);
        this.dataSource = r[0];
        this.resultsLength = r[1];
        this.isLoadingResults = false;
      }
    );
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      adresse: [this.o.adresse, Validators.required],
      lat: [this.o.lat, Validators.required],
      lng: [this.o.lng, Validators.required],
      parcoursId: [this.parentObject.id],
    });
  }

  openDialog(o: Etap, text) {
    const dialogRef = this.dialog.open(AddEtapComponent, {
      width: '750px',
      disableClose: true,
      data: { model: o, title: text }
    });

    return dialogRef.afterClosed();
  }

  add() {
    const f = new Etap();
    f.lat = 48.86;
    f.lng = 2.39;
    f.parcoursId = this.parentObject.id;
    this.openDialog(f, 'Ajouter Etap').subscribe(result => {
      if (result) {
        console.log(result);
        this.update.next(true)
      }
    });
  }

  edit(o: Etap) {
    this.openDialog(o, 'Modifier Etap').subscribe((result: Etap) => {
      if (result) {
        console.log(result);
        this.update.next(true)
      }
    });
  }

  async delete(o: Etap) {
    const r = await this.mydialog.openDialog('Etap').toPromise();
    if (r === 'ok') {
      this.uow.etaps.delete(o.id).subscribe(() => {
        this.update.next(true)
      });
    }
  }

  addQuizz(o: Etap) {
    const q = new Quizz();
    q.etapId = o.id;

    this.dialog.open(QuizzComponent, {
      width: '750px',
      disableClose: true,
      data: { model: q, title: 'Quizz' }
    });
  }

}




