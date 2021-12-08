import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player } from '../model/Player';
import { CountryGroup } from '../model/CountryGroup';
import { DailyType } from './DailyType';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { City } from '../model/City';

@Component({
  selector: 'app-daily-data',
  templateUrl: './daily.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  styleUrls: ['./daily.component.css']
})
export class DailyComponent {
  public players: Player[] = [];
  public countryGroups: CountryGroup[] = [];

  world: City = { id: "world", name: "🌍 World" };

  maxXp: number;

  private sub: any;

  city: City;

  dailyType: DailyType = 0;

  m_http: HttpClient;
  m_baseUrl: string;

  loading = true;

  minDate: Date;
  maxDate: Date;

  startDate: Date;
  endDate: Date;
  title: string;
  reportPeriood: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _adapter: DateAdapter<any>, private route: ActivatedRoute) {
    this.m_http = http;
    this.m_baseUrl = baseUrl;
    this._adapter.setLocale('ru');
  }


  async ngOnInit() {
    await this.loadDates();
    let defaultCity;
    this.sub = this.route.params.subscribe(params => {
      defaultCity = params['city'];
    });
    await this.loadCities(defaultCity);
  }

  setDefaultCityByName(name: string) {
    this.countryGroups.forEach(x => {
      x.cities.forEach(c => {
        if (c.name.toLowerCase() === name.toLowerCase())
          this.city = c;
      })
    })
  }

  async loadCities(defaultCity: string) {
    await this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
      this.countryGroups = result;
      if (defaultCity)
        this.setDefaultCityByName(defaultCity);
      this.onChangeDailyType();
    }, error => console.error(error));
  }

  async loadDates() {
    this.minDate = new Date(await this.m_http.get<Date>(this.m_baseUrl + 'date', {
      params: new HttpParams()
        .set("type", "min")
    }).toPromise());

    this.maxDate = new Date(await this.m_http.get<Date>(this.m_baseUrl + 'date', {
      params: new HttpParams()
        .set("type", "max")
    }).toPromise());

  }

  onChangeCity(city: City) {
    this.setCity(city);
    this.clearTable();
    this.load(this.city.id);
  }

  setCity(city: City) {
    this.city = city;
  }

  onSubmitClick() {
    this.load(this.city ? this.city.id : undefined);
  }

  clearTable() {
    if (this.players.length > 0)
      this.players = [];
  }

  onChangeDailyType() {
    this.players = [];
    switch (this.dailyType) {
      case DailyType.Day: {
        this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 1);
        this.endDate = this.maxDate;
        this.title = `Daily report`;
        this.reportPeriood = `${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`;
        break;
      }
      case DailyType.Week: {
        this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 7);
        this.endDate = this.maxDate;
        this.title = `Weekly report`
        this.reportPeriood = `${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`;
        break;
      }
      case DailyType.Month: {
        this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 30);
        this.endDate = this.maxDate;
        this.title = `Monthly report`
        this.reportPeriood = `${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`;
        break;
      }
      case DailyType.Custom: {
        this.startDate = this.minDate;
        this.endDate = this.maxDate;
        this.title = `Custom report`;
        this.reportPeriood = ``;
        break;
      }
    }
    this.load(this.city && this.city.id ? this.city.id : undefined);
  }

  load(cityId: string) {
    this.loading = true;
    let params = new HttpParams()
      .set("startDate", this.getIsoDateString(this.startDate))
      .set("endDate", this.getIsoDateString(this.endDate));

    if (cityId && cityId !== "world")
      params = params.append("cityId", cityId);

    this.m_http.get<Player[]>(this.m_baseUrl + 'range', {
      params
    }).subscribe(result => {
      this.clearTable();
      this.players = result;
      result.length > 0 ? this.maxXp = result[0].xp : 0;
      this.loading = false;
    }, error => console.error(error));

  }

  getIsoDateString(date: Date) {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
  }
  getTopPercent(xp: number) {
    return Math.round((Math.sqrt(xp) / Math.sqrt(this.maxXp)) * 100);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
