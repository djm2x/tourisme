
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ParcoursService } from './parcours.service';
import { EtapService } from './etap.service';
import { ReponseService } from './reponce.service';
import { QuizzService } from './quizz.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
  users = new UserService();
  accounts = new AccountService();
  parcours = new ParcoursService();
  etaps = new EtapService();
  reponces = new ReponseService();
  quizzs = new QuizzService();

  // tslint:disable-next-line: max-line-length
  // autorisation = [{ id: 1, name: 'Autorisation provisoire' }, { id: 2, name: 'Autorisation définitive' }, { id: 3, name: 'Non encore autorisé' }];
  // etatProjet = [{ id: 1, name: 'En cours de développement' }, { id: 2, name: 'En cours d\'exploitation' }];
  // years = [...Array(10).keys()].map(e => (new Date().getFullYear() - 10) + e + 1);
  // months = [...Array(12).keys()].map(e => e + 1);
  // monthsAlpha = [
  //   'Janvier',
  //   'Février',
  //   'Mars',
  //   'Avril',
  //   'Mai',
  //   'Juin',
  //   'Juillet',
  //   'Août',
  //   'Septembre',
  //   'Octobre',
  //   'Novembre',
  //   'Décembre',
  // ].map((e, i) => {
  //   return { id: i + 1, name: e };
  // });
  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }
}
