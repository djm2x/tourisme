

import { SessionService } from 'src/app/shared';
import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { UowService } from 'src/app/services/uow.service';
import { Parcours, User, UserParcoursVisite } from 'src/app/Models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.scss']
})
export class FollowedComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  update = new EventEmitter();
  resultsLength = 0;

  list: UserParcoursVisite[] = [];
  filter = new FormControl('');
  linkImage = '../../assets/link.png';
  id = 0;
  constructor(private uow: UowService, public dialog: MatDialog
    , private session: SessionService, private route: ActivatedRoute
    , private router: Router) {
    this.isMe();
  }

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

  isMe() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.session.user.id !== this.id && this.session.user.role === 'user') {
      this.router.navigate(['/home']);
    }
  }

  show(author: User) {
    return this.session.user.id === author.id || this.session.user.role === 'admin';
  }

  // disable(id)

  get(startIndex, pageSize, filter) {
    filter = filter === '' ? '*' : filter;
    this.uow.userParcoursVisites.getFollowed(startIndex, pageSize, this.id, filter).subscribe((r: any) => {
      this.list = r[0];
      this.resultsLength = r[1];
      console.log(r)
    });
  }

  search() {
    this.update.next(true);
  }

  reset() {
    this.filter.setValue('');
    this.update.next(true);
  }

  delete(e: UserParcoursVisite): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: { model: 'Parcours' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uow.userParcoursVisites.deleteBy(e.userId, e.parcoursId).subscribe(r => {
          this.update.next(false);
        });
      }
    });
  }

}



