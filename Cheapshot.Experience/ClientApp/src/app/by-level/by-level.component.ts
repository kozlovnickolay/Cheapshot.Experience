import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { Player } from '../model/Player';
import { CountryGroup } from '../model/CountryGroup';
import { City } from '../model/City';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-level',
  templateUrl: './by-level.component.html',
  styleUrls: ['./by-level.component.css']
})
export class ByLevelComponent {
  public players: Player[] = [];
  public countryGroups: CountryGroup[] = [];

  maxXp: number;

  world: City = { id: "world", name: "🌍 World" };

  city: City;

  title: string = "World top";

  m_http: HttpClient;
  m_baseUrl: string

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public font: CheapshotFont, private route: ActivatedRoute) {
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

  setCityByName(name: string) {
    if (name !== "World")
      this.countryGroups.forEach(x => {
        x.cities.forEach(c => {
          if (c.name.toLowerCase() === name.toLowerCase())
            this.setCity(c);
        });
      });
    else
      this.setCity(this.world);
  }

  loadCities(defaultCity: string) {
    this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
      this.countryGroups = result;
      if (defaultCity)
        this.setCityByName(defaultCity);
      this.load();
    }, error => console.error(error));
  }

  onChangeCity(city: City) {
    this.setCity(city);
    this.players = [];
    this.load();
  }

  setCity(city: City) {
    this.city = city;
    this.title = `${city.name} top by level`;
  }

  load() {

    let params = new HttpParams();

    if (this.city && this.city.id !== "world")
      params = new HttpParams()
        .set("cityId", this.city.id);

    this.m_http.get<Player[]>(this.m_baseUrl + 'level', {
      params
    }).subscribe(result => {
      this.players = result;
      result.length > 0 ? this.maxXp = result[0].xp : 0;
    }, error => console.error(error));

  }

  private sub: any;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}