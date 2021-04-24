import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { Player } from '../model/Player';
import { CountryGroup } from '../model/CountryGroup';
import { City } from '../model/City';

@Component({
  selector: 'app-by-level',
  templateUrl: './by-level.component.html'
})
export class ByLevelComponent {
  public players: Player[] = [];
  public countryGroups: CountryGroup[] = [];

  city: City;

  title: string = "World top by level";

  m_http: HttpClient;
  m_baseUrl: string

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public font: CheapshotFont) {
    this.m_http = http;
    this.m_baseUrl = baseUrl;
  }

  ngOnInit() {
    this.loadCities();
    this.load(undefined);
  }

  loadCities() {
    this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
      this.countryGroups = result;
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
    }, error => console.error(error));

  }
}
