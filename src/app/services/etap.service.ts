import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Etap } from '../Models/models';


@Injectable({
  providedIn: 'root'
})
export class EtapService extends SuperService<Etap> {

  constructor() {
    super('Etaps');
  }

  getAll = (startIndex, pageSize, sortBy, sortDir, id) =>
    this.http.get<Etap[]>(`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${id}`)

}
