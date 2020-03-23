export class User {
    id = null;
    firstname = '';
    lastname = '';
    email = '';
    password = '';
    role = '';
    userParcoursVisites: UserParcoursVisite[] = [];
    // userParcoursCrees: UserParcoursCree[] = [];
    reponses: Reponse[] = [];
    parcours: Parcours[] = [];
}
export class Parcours {
    id = null;
    titre = '';
    image = '';
    descriptif = '';
    temps = 0;
    lat = 0;
    lng = 0;
    date = new Date();
    userId = null;
    user = new User();
    etaps: Etap[] = [];
    userParcoursVisites: UserParcoursVisite[] = [];
    // userParcoursCrees: UserParcoursCree[] = [];
}
export class UserParcoursVisite {
    userId = null;
    parcoursId = null;
    date = new Date();
    user: User;
    parcours: Parcours;
}
// export class UserParcoursCree {
//     userId = null;
//     parcoursId = null;
//     date = new Date();
//     user: User;
//     parcours: Parcours;
// }
export class Etap {
    id = null;
    adresse = '';
    lat = 0;
    lng = 0;
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
    date = new Date();
    // lat = 0;
    // lng = 0;
    quizzId = 0;
    userId = 0;
    quizz: Quizz;
    user: User;
}
