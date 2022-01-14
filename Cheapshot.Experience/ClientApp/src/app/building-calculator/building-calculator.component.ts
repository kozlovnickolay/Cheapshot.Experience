import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { CheapshotFont } from '../fonts/CheapshotFont';
import buildings from './buildings';

@Component({
	templateUrl: './building-calculator.component.html',
	styleUrls: ['./building-calculator.component.css']
})
export class BuildingCalculatorComponent implements OnInit {

	constructor(public font: CheapshotFont) { }

	ngOnInit() {
	}

	autoTicks = false;
	disabled = false;
	invert = false;
	showTicks = false;
	step = 1;
	thumbLabel = false;
	vertical = false;
	color = 'warn';

	fromMax = buildings.length - 2;
	fromMin = 0;
	fromValue = 0;
	fromPic = buildings[0].pic;

	toMax = buildings.length - 1;
	toMin = 1;
	toValue = 1;
	toPic = buildings[1].pic;


	total = buildings[1].total - buildings[0].total;

	onChangeFromLevel(event: MatSliderChange) {
		this.fromValue = event.value;

		if (this.toValue < event.value) {
			this.toValue = event.value + 1;
			this.toPic = buildings[event.value + 1].pic;
		}

		this.toMin = event.value + 1;
		this.fromPic = buildings[event.value].pic;
		this.total = buildings[this.toValue].total - buildings[event.value].total;
	}

	onChangeToLevel(event: MatSliderChange) {
		this.toValue = event.value;

		if (this.fromValue > event.value) {
			this.fromValue = event.value - 1;
			this.fromPic = buildings[event.value - 1].pic;
		}

		this.fromMax = event.value - 1;
		this.toPic = buildings[event.value].pic;
		this.total = buildings[event.value].total - buildings[this.fromValue].total;
	}
}