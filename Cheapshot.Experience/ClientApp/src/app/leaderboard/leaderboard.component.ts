import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapshotFont } from '../fonts/file';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent {
  public players: Player[];
  public font = new CheapshotFont();

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
