import { SuperService } from './super.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<any> {

  constructor() {
    super('users');
  }

  getAll(startIndex, pageSize, sortBy, sortDir, nom = '*', prenom = '*', organisme = '') {
    return this.http.get(
      `${this.urlApi}/${this.controller}/GetAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${nom}/${prenom}/${organisme}`
      );
  }

  login(model) {
    return this.http.post(`${this.urlApi}/users/login`, model);
  }

  create(model) {
    return this.http.post(`${this.urlApi}/users/create`, model);
  }

}
