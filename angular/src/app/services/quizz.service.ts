import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { Quizz } from '../Models/models';


@Injectable({
  providedIn: 'root'
})
export class QuizzService extends SuperService<Quizz> {

  constructor() {
    super('Quizzs');
  }

  getAll = (startIndex, pageSize, sortBy, sortDir, id) =>
    this.http.get<Quizz[]>
    (`${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}/${id}`)

}
