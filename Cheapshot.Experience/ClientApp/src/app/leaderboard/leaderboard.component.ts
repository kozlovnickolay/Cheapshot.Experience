import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapshotFont } from '../fonts/file';
import { Player } from '../model/Player';
import { City } from '../model/City';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent {
  public players: Player[];
  public cities: City[];
  public font = new CheapshotFont();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<City[]>(baseUrl + 'city').subscribe(result => {
      this.cities = result;
    }, error => console.error(error));

    http.get<Player[]>(baseUrl + 'top', {
      params: new HttpParams()
        .set("startDate", "2021-04-09")
        .set("endDate", "2021-04-11")
    }).subscribe(result => {
      this.players = result;
    }, error => console.error(error));
  }
}