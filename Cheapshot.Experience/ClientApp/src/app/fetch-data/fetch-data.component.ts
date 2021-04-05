import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public players: Player[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    let params = new HttpParams();

      //.set("cityId", "b415dfc6-c25b-45f9-83b0-6822a887ed91"); //Create new HttpParams

    http.get<Player[]>(baseUrl + 'top', {
      params
    }).subscribe(result => {
      this.players = result;
    }, error => console.error(error));
  }
}

interface Player {
  pic: string;
  name: string;
  level: number;
  xp: number;
  cities: string;
}
