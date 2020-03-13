import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { UowService } from 'src/app/services/uow.service';
import { Parcours } from 'src/app/Models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
