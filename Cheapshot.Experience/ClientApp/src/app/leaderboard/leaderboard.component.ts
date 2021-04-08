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

  city: string;

  m_http: HttpClient;
  m_baseUrl: string

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.m_http = http;
    this.m_baseUrl = baseUrl;
    http.get<City[]>(baseUrl + 'city').subscribe(result => {
      this.cities = result;
    }, error => console.error(error));

    this.load(undefined);


  }

  onChangeCity() {
    console.log(this.city);
    this.players = [];
    this.load(this.city);
  }

  load(cityId: string) {


    let params = new HttpParams()
      .set("startDate", "2021-04-07")
      .set("endDate", "2021-04-08");

    if (cityId && cityId !== "world")
      params = new HttpParams()
        .set("startDate", "2021-04-07")
        .set("endDate", "2021-04-08")
        .set("cityId", cityId);

    this.m_http.get<Player[]>(this.m_baseUrl + 'top', {
      params
    }).subscribe(result => {
      this.players = result;
    }, error => console.error(error));

  }
}
