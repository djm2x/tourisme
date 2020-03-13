import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Reponse } from '../Models/models';


@Injectable({
  providedIn: 'root'
})
export class ReponseService extends SuperService<Reponse> {

  constructor() {
    super('Reponces');
  }
}
