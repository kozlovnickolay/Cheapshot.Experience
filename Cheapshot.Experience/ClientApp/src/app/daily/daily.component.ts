import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { Player } from '../model/Player';
import { CountryGroup } from '../model/CountryGroup';
import { UiService } from '../ui.service';
import { DailyType } from './DailyType';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';

@Component({
  selector: 'app-daily-data',
  templateUrl: './daily.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
})
export class DailyComponent {
  public players: Player[] = [];
  public countryGroups: CountryGroup[] = [];


  city: string;

  dailyType: DailyType = 0;

  m_http: HttpClient;
  m_baseUrl: string;
  m_ui: UiService;

  minDate: Date;
  maxDate: Date;

  startDate: Date;
  endDate: Date;
  title: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private ui: UiService, private _adapter: DateAdapter<any>, public font: CheapshotFont) {
  this.m_http = http;
  this.m_baseUrl = baseUrl;
  this.m_ui = ui;

  this._adapter.setLocale('ru');
}

async ngOnInit() {
  await this.loadCities();
  await this.loadDates();
  this.onChangeDailyType();
}

async loadCities() {
  await this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
    this.countryGroups = result;
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

onChangeCity() {
  console.log(this.city);
  this.clearTable();
  this.load(this.city);
}

onSubmitClick() {
  this.clearTable();
  this.load(this.city);
}

clearTable() {
  if (this.players.length > 0)
    this.players = [];
}

onChangeDailyType() {
  this.clearTable();

  switch (this.dailyType) {
    case DailyType.Day: {
      this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 1);
      this.endDate = this.maxDate;
      this.title = `Daily report ${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`
      break;
    }
    case DailyType.Week: {
      this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 7);
      this.endDate = this.maxDate;
      this.title = `Weekly report ${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`

      break;
    }
    case DailyType.Month: {
      this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 30);
      this.endDate = this.maxDate;
      this.title = `Monthly report ${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`
      break;
    }
    case DailyType.Custom: {
      this.startDate = this.minDate;
      this.endDate = this.maxDate;
      this.title = `Custom report`
      break;
    }
  }
  this.load(this.city)
}

load(cityId: string) {
  this.ui.spin$.next(true);

  let params = new HttpParams()
    .set("startDate", this.getIsoDateString(this.startDate))
    .set("endDate", this.getIsoDateString(this.endDate));

  if (cityId && cityId !== "world")
    params = params.append("cityId", cityId);

  this.m_http.get<Player[]>(this.m_baseUrl + 'range', {
    params
  }).subscribe(result => {
    this.players = result;
    this.ui.spin$.next(false);
  }, error => console.error(error));

}

getIsoDateString(date: Date){
  return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
}
}
