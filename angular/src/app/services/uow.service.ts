
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ParcoursService } from './parcours.service';
import { EtapService } from './etap.service';
import { ReponseService } from './reponce.service';
import { QuizzService } from './quizz.service';
import { UserParcoursVisiteService } from './user.parcours.visite.service';

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
  userParcoursVisites = new UserParcoursVisiteService();

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
