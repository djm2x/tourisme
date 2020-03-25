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

  getFollowed = (startIndex, pageSize, idUser, filter) =>
    this.http.get<UserParcoursVisite[]>(`${this.urlApi}/${this.controller}/getFollowed/${startIndex}/${pageSize}/${idUser}/${filter}`)

  deleteBy = (idUser, idParcours) => 
    this.http.delete<any>(`${this.urlApi}/${this.controller}/delete/${idUser}/${idParcours}`);

}
