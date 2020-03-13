export class User {
    id = null;
    firstname = 'valery';
    lastname = 'micheux';
    email = 'valery@angular.io';
    password = '123';
    role = 'user';
    userParcoursVisites: UserParcoursVisite[] = [];
    userParcoursCrees: UserParcoursCree[] = [];
    reponses: Reponse[] = [];
}
export class Parcours {
    id = null;
    titre = 'titre hasard';
    image = 'https://previews.123rf.com/images/rastudio/rastudio1704/rastudio170401212/76011566-grupo-de-m%C3%BAsicos-asi%C3%A1ticos-que-juegan-en-los-instrumentos-musicales-m%C3%BAsicos-tocando-instrumentos-musicales-m%C3%BAsicos.jpg';
    descriptif = 'nimport quoi qui veut un descriptif, just do it ';
    temps = 0;
    lat = '00';
    lng = '00';
    etaps: Etap[] = [];
    userParcoursVisites: UserParcoursVisite[] = [];
    userParcoursCrees: UserParcoursCree[] = [];
}
export class UserParcoursVisite {
    userId = null;
    parcoursId = null;
    date = new Date();
    user: User;
    parcours: Parcours;
}
export class UserParcoursCree {
    userId = null;
    parcoursId = null;
    date = new Date();
    user: User;
    parcours: Parcours;
}
export class Etap {
    id = null;
    adresse = '';
    lat = '';
    lng = '';
    parcoursId = 0;
    parcours: Parcours;
    quizzs: Quizz[] = [];
}
export class Quizz {
    id = null;
    question = '';
    reponse = '';
    choix = '';
    etapId = 0;
    etap: Etap;
    reponses: Reponse[] = [];
}
export class Reponse {
    id = null;
    reponse = '';
    lat = '';
    lng = '';
    quizzId = 0;
    userId = 0;
    quizz: Quizz;
    user: User;
}
