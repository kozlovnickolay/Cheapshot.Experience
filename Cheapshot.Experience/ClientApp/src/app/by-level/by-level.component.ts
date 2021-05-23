import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { Player } from '../model/Player';
import { CountryGroup } from '../model/CountryGroup';
import { City } from '../model/City';
import { MatBottomSheet } from '@angular/material';
import { PlayerBottomSheet } from '../player-bottom-sheet/player-bottom-sheet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-level',
  templateUrl: './by-level.component.html',
  styleUrls: ['./by-level.component.css']
})
export class ByLevelComponent {
  public players: Player[] = [];
  public countryGroups: CountryGroup[] = [];

  private maxXp: number;

  city: City;

  title: string = "World top";

  m_http: HttpClient;
  m_baseUrl: string

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public font: CheapshotFont, private _bottomSheet: MatBottomSheet, private route: ActivatedRoute) {
    this.m_http = http;
    this.m_baseUrl = baseUrl;
  }

  async ngOnInit() {
    let defaultCity;
    this.sub = this.route.params.subscribe(params => {
      defaultCity = params['city'];
    });
    this.loadCities(defaultCity);
  }

  setDefaultIdByName(name: string) {
    this.countryGroups.forEach(x => {
      x.cities.forEach(c => {
        if (c.name.toLowerCase() === name.toLowerCase())
          this.city = c;
      })
    })
  }

  loadCities(defaultCity: string) {
    this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
      this.countryGroups = result;
      if (defaultCity)
        this.setDefaultIdByName(defaultCity);
      this.load(this.city && this.city.id ? this.city.id : undefined);
    }, error => console.error(error));
  }

  onChangeCity() {
    if (this.city.id && this.city.id !== "world")
      this.title = `${this.city.name} top by level`
    else
      this.title = "World top by level"

    this.players = [];
    this.load(this.city.id);
  }

  load(cityId: string) {

    let params = new HttpParams();

    if (cityId && cityId !== "world")
      params = new HttpParams()
        .set("cityId", cityId);

    this.m_http.get<Player[]>(this.m_baseUrl + 'level', {
      params
    }).subscribe(result => {
      this.players = result;
      result.length > 0 ? this.maxXp = result[0].xp : 0;
    }, error => console.error(error));

  }

  getTopPercent(xp: number) {
    return Math.round((Math.sqrt(xp) / Math.sqrt(this.maxXp)) * 100);
  }

  getUserRowStyle(xp: number) {
    const percent = this.getTopPercent(xp);
    const background = 'linear-gradient(to right, hsl(195, 100%, ' + (25 + Math.round(percent / 3)) + '%) ' + percent + '%, #00000038 ' + percent + '%)';
    const borderBottom = '1px solid #343a40';
    return {
      background,
      borderBottom
    };
  }

  private sub: any;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openPlayerBottomSheet(player: Player): void {
    this._bottomSheet.open(PlayerBottomSheet, {
      data: player
    });
  }
}