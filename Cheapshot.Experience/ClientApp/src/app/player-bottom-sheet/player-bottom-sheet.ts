import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { CheapshotFont } from "../fonts/CheapshotFont";
import { Player } from "../model/Player";
import { getIsoDateString } from "../model/traits";

interface Chart {
  name: string;
  pic: string;
  labels: string[];
  levels: number[];
  series: number[];
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'player-bottom-sheet.html',
  styleUrls: ['player-bottom-sheet.css']
})
export class PlayerBottomSheet implements OnInit {

  m_http: HttpClient;
  m_baseUrl: string;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: undefined
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private changeDetectorRef: ChangeDetectorRef, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _bottomSheetRef: MatBottomSheetRef<PlayerBottomSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: Player & { min: Date, max: Date }, public font: CheapshotFont) {
    this.m_http = http;
    this.m_baseUrl = baseUrl;
  }
  async ngOnInit(): Promise<void> {
    const cities = await this.m_http.get<string[]>(this.m_baseUrl + `city/user/${this.data.userId}`).toPromise();
    this.data.cities = cities.join(", ");
    this.changeDetectorRef.detectChanges();

    if (this.data.min && this.data.max) {
      const chart = await this.m_http.get<Chart>(this.m_baseUrl + `level/chart/${this.data.userId}/${getIsoDateString(this.data.min)}/${getIsoDateString(this.data.max)}`).toPromise();

      this.lineChartData.push({
        data: chart.series,
        label: `${chart.pic} ${chart.name}`,
        backgroundColor: 'rgba(41,201,255,0.3)'
      });

      this.lineChartLabels = chart.labels;
      this.changeDetectorRef.detectChanges();

    }


  }

  openLink(event: MouseEvent): void {

    this._bottomSheetRef.dismiss();

    event.preventDefault();

  }



}