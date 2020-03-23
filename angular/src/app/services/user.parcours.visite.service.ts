import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { UserParcoursVisite } from '../Models/models';


@Injectable({
  providedIn: 'root'
})
export class UserParcoursVisiteService extends SuperService<UserParcoursVisite> {

  constructor() {
    super('UserParcoursVisites');
  }

}
