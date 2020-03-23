import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Parcours } from '../Models/models';


@Injectable({
  providedIn: 'root'
})
export class ParcoursService extends SuperService<Parcours> {

  constructor() {
    super('Parcours');
  }

  getAll = (startIndex, pageSize, filter) =>
    this.http.get<Parcours[]>(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${filter}`)

  getCreated = (startIndex, pageSize, filter) =>
    this.http.get<Parcours[]>(`${this.urlApi}/${this.controller}/getCreated/${startIndex}/${pageSize}/${filter}`)

  getFollowed = (startIndex, pageSize, filter) =>
    this.http.get<Parcours[]>(`${this.urlApi}/${this.controller}/getFollowed/${startIndex}/${pageSize}/${filter}`)

}
