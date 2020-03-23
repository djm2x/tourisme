import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { UowService } from 'src/app/services/uow.service';
import { Parcours } from 'src/app/Models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/delete/delete.component';

enum PageTile {
  LIST = 'LIST',
  CREATED = 'CREATED',
  FOLLOWED = 'FOLLOWED'
}

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() pageTitle = PageTile.LIST;
  update = new EventEmitter();
  resultsLength = 0;

  list: Parcours[] = [];
  filter = new FormControl('');
  linkImage = '../../assets/link.png';
  constructor(private uow: UowService, public dialog: MatDialog) { }

  ngOnInit() {
    this.get(0, 6, '');
    merge(...[this.paginator.page, this.update]).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.get(
          startIndex,
          this.paginator.pageSize,
          this.filter ? this.filter.value : ''
        );
      }
    );
  }

  get(startIndex, pageSize, filter) {
    filter = filter === '' ? null : filter;
    if (this.pageTitle === PageTile.LIST) {
      this.uow.parcours.getAll(startIndex, pageSize, filter).subscribe((r: any) => {
        this.list = r[0];
        this.resultsLength = r[1];
        console.log(r)
      });
    } else if (this.pageTitle === PageTile.CREATED){
      this.uow.parcours.getCreated(startIndex, pageSize, filter).subscribe((r: any) => {
        this.list = r[0];
        this.resultsLength = r[1];
        console.log(r)
      });
    } else {
      this.uow.parcours.getFollowed(startIndex, pageSize, filter).subscribe((r: any) => {
        this.list = r[0];
        this.resultsLength = r[1];
        console.log(r)
      });
    }


  }

  search() {
    this.update.next(true);
  }

  reset() {
    this.filter.setValue('');
    this.update.next(true);
  }

  delete(id): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uow.parcours.delete(id).subscribe(r => {
          this.update.next(false);
        });
      }
    });
  }

}

