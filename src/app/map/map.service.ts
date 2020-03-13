import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KEY } from './config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  restaurantPlaceApi(lat, lan) {

    console.log(lan, lat, "asdads")
    const radius = '500';
    const type = 'hospital';
    const keyword = 'cruise';
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');


    return this.http.get(`${URL}/json?location=${lat},${lan}&radius=${radius}&type=${type}&keyword=${keyword}&key=${KEY}`);
  }

  public handleError(error: Response) {
    console.error(error);
    return Observable.throw((error.json() as any).error || 'Server error');
  }
}
