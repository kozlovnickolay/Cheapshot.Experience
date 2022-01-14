import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { BuildingCalculatorComponent } from '../building-calculator/building-calculator.component';
import { EnvelopCalculatorComponent } from '../envelop-calculator/envelop-calculator.component';
import { CheapshotFont } from '../fonts/CheapshotFont';

@Component({
	selector: 'app-tools',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolsComponent implements OnInit {

	constructor(public font: CheapshotFont, private _bottomSheet: MatBottomSheet) {
	}
	ngOnInit() {
	}

	onEnvelopCalculatorClick() {
		this._bottomSheet.open(EnvelopCalculatorComponent);
	}

	onBuildingCalculatorClick() {
		this._bottomSheet.open(BuildingCalculatorComponent);
	}

}
