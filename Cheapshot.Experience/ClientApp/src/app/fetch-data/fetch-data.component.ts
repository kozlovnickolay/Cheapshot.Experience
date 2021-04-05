import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public players: Player[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Player[]>(baseUrl + 'top').subscribe(result => {
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
