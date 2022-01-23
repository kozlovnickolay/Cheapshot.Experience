import { HttpClient, HttpParams } from "@angular/common/http";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { ThousandSuffixesPipe } from "../custom-pipes/thousand-suffixes-pipe";
import { CheapshotFont } from "../fonts/CheapshotFont";
import { Chart } from "../model/Chart";
import { Player } from "../model/Player";
import { getIsoDateString } from "../model/traits";

@Component({
	selector: 'bottom-sheet-overview-example-sheet',
	templateUrl: 'player-bottom-sheet.html',
	styleUrls: ['player-bottom-sheet.css']
})
export class PlayerBottomSheet implements OnInit {

	m_http: HttpClient;
	m_baseUrl: string;

	chartVisible: boolean = true;

	lineChartData: ChartDataSets[] = []
	lineChartLabels: Label[] = [];
	lineChartOptions: ChartOptions = {
		legend: {
			display: true,
			labels: {
				fontColor: "lightgray"
			}
		},
		responsive: true,
		scales: {
			xAxes: [{
				display: 'auto',
				type: "time",
				time: {
					unit: 'day',
					displayFormats: {
						day: 'YYYY MMM D'
					}
				},
				ticks: {
					autoSkip: true,
					fontColor: "lightgray"
				},
				gridLines: {
					borderDash: [2, 5]
				}
			}],
			yAxes: [{
				display: 'auto',
				id: 'xp',
				type: 'linear',
				gridLines: {
					borderDash: [2, 5]
				},
				ticks: {
					callback: (label: number) => this.formatPipe.transform(label, 1),
					fontColor: "lightgray",
					autoSkip: true
				}
			}, {
				id: 'levels',
				type: 'linear',
				gridLines: {
					borderDash: [2, 5]
				},
				ticks: {
					fontColor: "lightgray",
					autoSkip: true,
					stepSize: 1
				}
			}]
		},
		tooltips: {
			enabled: false
		},
		elements: {
			point: {
				radius: 0
			}
		}
	};

	colors: Color[] = [{
		borderColor: 'rgba(41,201,255,1)',
		backgroundColor: 'rgba(41,201,255,0.4)',
		borderWidth: 1,
		hoverBackgroundColor: "rgba(232,105,90,0.8)",
		hoverBorderColor: "orange"
	}, {
		borderColor: 'rgba(40,167,69,1)',
		backgroundColor: 'rgba(41,201,255,0)',
		borderWidth: 3,
		hoverBackgroundColor: "rgba(232,105,90,0.8)",
		hoverBorderColor: "orange"
	}]

	lineChartLegend = false;
	lineChartType = 'line';

	hasPeriod: boolean;

	constructor(private formatPipe: ThousandSuffixesPipe, private changeDetectorRef: ChangeDetectorRef, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _bottomSheetRef: MatBottomSheetRef<PlayerBottomSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Player & { min: Date, max: Date }, public font: CheapshotFont) {
		this.m_http = http;
		this.m_baseUrl = baseUrl;

		this.hasPeriod = !!(data.min && data.max);

		if (this.hasPeriod) {
			const days = Math.abs(data.max.getTime() - data.min.getTime()) / 1000 / 60 / 60 / 24;
			if (days === 1)
				this.chartVisible = false;
		}
	}
	async ngOnInit(): Promise<void> {
		const cities = await this.m_http.get<string[]>(this.m_baseUrl + `city/user/${this.data.userId}`).toPromise();
		this.data.cities = cities.join(", ");
		this.changeDetectorRef.detectChanges();

		if (!this.chartVisible)
			return;

		let params = new HttpParams()
			.set("userId", this.data.userId);

		if (this.hasPeriod)
			params = params
				.append("startDate", getIsoDateString(this.data.min))
				.append("endDate", getIsoDateString(this.data.max));

		const chart = await this.m_http.get<Chart>(this.m_baseUrl + 'chart', { params }).toPromise();
		this.lineChartData = [{
			yAxisID: 'xp',
			data: this.hasPeriod ? chart.dayValues : chart.values,
			label: this.hasPeriod ? 'Daily xp' : 'Xp',
			fill: true
		}, {
			yAxisID: 'levels',
			data: chart.levels,
			label: 'Level',
			fill: false,
			lineTension: 0
		}];

		this.lineChartLegend = true;

		this.lineChartLabels = chart.dates;
		this.changeDetectorRef.detectChanges();
	}

	openLink(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		event.preventDefault();
	}

}