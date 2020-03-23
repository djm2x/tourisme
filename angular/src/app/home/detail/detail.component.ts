import { Component, OnInit, EventEmitter } from '@angular/core';
import { UowService } from 'src/app/services/uow.service';
import { ActivatedRoute } from '@angular/router';
import { Parcours, Quizz, Reponse, User } from 'src/app/Models/models';
import { SessionService } from 'src/app/shared';
import { SnackBarService } from 'src/app/loader/snack-bar.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id = 0;
  o = new Parcours();
  currentPosition = new EventEmitter();
  // disable = false;
  constructor(private uow: UowService, private route: ActivatedRoute
    , private session: SessionService, public snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.uow.parcours.getOne(this.id).subscribe(r => {
      this.o = r as any;
      console.log(this.o);
      // this.createForm();
      // this.sendObjectToEtapComponent.next(this.o);
      this.currentPosition.next({ lat: this.o.lat, lng: this.o.lng });

      this.o.etaps.forEach(e => {

        this.currentPosition.next({ lat: e.lat, lng: e.lng });
      })
    });
  }

  show(author: User) {
    return this.session.user.id === author.id || this.session.user.role === 'admin';
  }

  response(o: Quizz) {
    console.log(o)
  }

  splite(choix: string) {
    const chooses = choix.split(';');

    chooses.pop();

    // console.log(choix)

    return chooses;
  }

  async doRespond(reponseUser: string, q: Quizz) {
    // console.log(reponseUser, q.reponses[0].reponse);

    const r = q.reponses.length !== 0 ? q.reponses[0] : new Reponse();
    r.reponse = reponseUser;
    r.quizzId = q.id;
    r.userId = this.session.user.id;

    const hasInsweredBefor = q.reponses[0] !== undefined;

    console.log(hasInsweredBefor)

    if (hasInsweredBefor && r.id !== 0 && this.diff_minute(new Date(), new Date(r.date)) < 1) {
      this.snackBar.notifyAlert(1, 'Réponse pas envoyé, veuillez attendre une minute');
      // this.disable = true;
      return;
    } else {
      // this.disable = false;
    }
    // console.log(r.id !== 0, this.diff_minute(new Date(), new Date(r.date)))

    r.date = new Date();
    await this.uow.reponces.post(r).toPromise();
    await this.uow.userParcoursVisites.post({userId: this.session.user.id, parcoursId: this.id, date: new Date()} as any).toPromise();

    this.o = await this.uow.parcours.getOne(this.id).toPromise();
  }

  hasResponce(q: Quizz) {
    if (q.reponses.length !== 0) {
      return true;
    }

    return false;
  }

  answer(btnName: string, q: Quizz) {
    if (q.reponses.length !== 0) {
      if (btnName !== q.reponses[0].reponse) {
        return { color: 'primary', text: '' };
      }
      if (q.reponses[0].reponse === q.reponse) {
        return { color: 'accent', text: ', reponse correcte : ' + q.reponse };
      }

      return { color: 'warn', text: ', reponse correcte : ' + q.reponse };
    }
    return { color: 'primary', text: '' };
  }

  diff_minute(dt2: Date, dt1: Date): number {
    // console.log(Math.abs(Math.round((dt2.valueOf() - new Date(dt1).valueOf() )/ 1000/ 60)))
    // let diff = (dt2.valueOf() - new Date(dt1).valueOf()) / 1000 / 60;
    // // diff /= (60 /* 60 */);
    // console.log(typeof dt1.getMonth === 'function', dt1 instanceof Date)
    // return Math.abs(Math.round(diff));
    // console.log(dt2.getMinutes() - dt1.getMinutes())
    return dt2.getMinutes() - dt1.getMinutes();
  }

}
