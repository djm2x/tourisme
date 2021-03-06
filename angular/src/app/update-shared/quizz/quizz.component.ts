import { Component, OnInit, ViewChild, EventEmitter, Input, Inject, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';
import { merge } from 'rxjs';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteService } from 'src/app/components/delete/delete.service';
import { Quizz } from 'src/app/Models/models';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { startWith, delay } from 'rxjs/operators';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  myForm: FormGroup;
  update = new EventEmitter();
  o = new Quizz();

  isEdit = false;

  isLoadingResults = false;
  resultsLength = 0;
  isRateLimitReached = false;

  dataSource = [];
  columnDefs = [
    { columnDef: 'question', headName: '' },
    { columnDef: 'reponse', headName: '' },
    { columnDef: 'choix', headName: '' },
    // { columnDef: 'titreAr', headName: '' },
    { columnDef: 'option', headName: 'OPTION' },
  ].map(e => {
    e.headName = e.headName === '' ? e.columnDef.toUpperCase() : e.headName;
    return e;
  });

  displayedColumns = this.columnDefs.map(e => e.columnDef);
  title = '';
  idParent = 0;
  constructor(private uow: UowService
    , private mydialog: DeleteService, private fb: FormBuilder
    , public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.idParent = this.o.etapId;
    console.log(this.o)
    this.createForm();

    setTimeout(() => {
      const chooses = this.o.choix.split(';').map(s => {
        return { value: s };
      });

      if (this.o.id) {
        chooses.pop();
        this.choixForm.removeAt(0);
      }

    }, 50);

    merge(...[this.sort.sortChange, this.paginator.page, this.update]).pipe(
      startWith(null as any),
      delay(0)).subscribe(r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.idParent,
        );
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPage(startIndex, pageSize, sortBy, sortDir, id) {
    this.isLoadingResults = true;
    this.uow.quizzs.getAll(startIndex, pageSize, sortBy, sortDir, id).subscribe(
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
      question: [this.o.question, Validators.required],
      reponse: [this.o.reponse, Validators.required],
      // choix: [this.o.choix, Validators.required],
      choix: this.fb.array([{ value: '' }].map(i => this.fb.group(i)) as FormGroup[]),
      etapId: [this.o.etapId],
    });
  }

  get choixForm() {
    return this.myForm.get('choix') as FormArray;
  }

  add() {
    this.choixForm.push(this.fb.group({ value: '' }));
  }

  removeAt(i: number) {
    this.choixForm.removeAt(i);
  }

  submit(o: Quizz) {
    o.choix = '';

    (this.choixForm.value as { value: string }[]).forEach(e => o.choix += `${e.value};`);

    if (o.id === null) {
      this.uow.quizzs.post(o).subscribe(async (r) => {
        this.reset()
        this.update.next(true);
      });
    } else {
      this.uow.quizzs.put(o.id, o).subscribe(async r => {
        this.reset()
        this.update.next(true);
      });
    }
  }


  async delete(o: Quizz) {
    const r = await this.mydialog.openDialog('Quizz').toPromise();
    if (r === 'ok') {
      this.uow.quizzs.delete(o.id).subscribe(() => {
        this.update.next(true)
      });
    }
  }

  edit(o: Quizz) {
    this.o = o;
    this.isEdit = true;
    const chooses = this.o.choix.split(';').map(s => {
      return { value: s };
    });
    this.createForm();

    chooses.pop();

    this.choixForm.removeAt(0);

    chooses.forEach(e => this.choixForm.push(this.fb.group(e)));

  }

  reset() {
    this.o = new Quizz();
    this.isEdit = false;
    this.createForm();
  }

}
