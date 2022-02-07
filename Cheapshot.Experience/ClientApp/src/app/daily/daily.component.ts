import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player } from '../model/Player';
import { CountryGroup } from '../model/CountryGroup';
import { DailyType } from './DailyType';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { City } from '../model/City';
import { getIsoDateString } from '../model/traits';

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

	prevButton: string;
	nextButton: string;

	showAll = false;

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

	onShowAllClick() {
		this.showAll = !this.showAll;
	}

	clearTable() {
		if (this.players.length > 0)
			this.players = [];
		this.showAll = false;
	}

	onChangeDailyType() {
		this.clearTable();
		switch (this.dailyType) {
			case DailyType.Day: {
				this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 1);
				this.endDate = this.maxDate;
				this.title = `Daily report`;
				break;
			}
			case DailyType.Week: {
				this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() - 7);
				this.endDate = this.maxDate;
				this.title = `Weekly report`
				break;
			}
			case DailyType.Month: {
				this.startDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() - 1, this.maxDate.getDate());
				this.endDate = this.maxDate;
				this.title = `Monthly report`
				break;
			}
			case DailyType.Custom: {
				this.startDate =new Date(this.maxDate.getFullYear(), 0, 1);
				this.endDate = this.maxDate;
				this.title = `Custom report`;
				break;
			}
		}
		this.reportPeriood = `${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`;

		this.load(this.city && this.city.id ? this.city.id : undefined);
	}

	onShiftClick(right: boolean = false) {
		this.clearTable();
		const operator = right ? -1 : 1;
		switch (this.dailyType) {
			case DailyType.Day: {
				this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() - 1 * operator);
				this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 1 * operator);
				break;
			}
			case DailyType.Week: {
				this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() - 7 * operator);
				this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate() - 7 * operator);
				break;
			}
			case DailyType.Month: {
				this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1 * operator, this.startDate.getDate());
				this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth() - 1 * operator, this.endDate.getDate());
				break;
			}
		}

		if (this.startDate < this.minDate)
			this.startDate = this.minDate;

		if (this.endDate >= this.maxDate)
			this.endDate = this.maxDate;

		this.reportPeriood = `${this.startDate.toLocaleDateString("ru")} - ${this.endDate.toLocaleDateString("ru")}`;
		this.load(this.city && this.city.id ? this.city.id : undefined);
	}

	load(cityId: string) {
		if (!this.loading)
			this.loading = true;
		let params = new HttpParams()
			.set("startDate", getIsoDateString(this.startDate))
			.set("endDate", getIsoDateString(this.endDate));

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


	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
