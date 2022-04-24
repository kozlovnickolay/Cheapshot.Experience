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

	editFromValue = false;
	editToValue = false;

	onEditFromValueClick = () => this.editFromValue = true;
	onEditToValueClick = () => this.editToValue = true;

	getTotalTime = (lvl: number) => (lvl - 1) * lvl / 2;
	getTotalXp = (lvl: number) => (8 + 3 * (lvl - 1)) * lvl / 2;

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


	totalCost = buildings[1].total - buildings[0].total;
	totalTime = this.getTotalTime(1) - this.getTotalTime(0);
	totalXp = this.getTotalXp(1) - this.getTotalXp(0);

	onChangeFromLevel(event: MatSliderChange) {
		this.fromValue = event.value;

		if (this.toValue < event.value) {
			this.toValue = event.value + 1;
			this.toPic = buildings[event.value + 1].pic;
		}

		this.toMin = event.value + 1;
		this.fromPic = buildings[event.value].pic;
		this.totalCost = buildings[this.toValue].total - buildings[event.value].total;

		this.totalTime = this.getTotalTime(this.toValue) - this.getTotalTime(event.value);
		this.totalXp = this.getTotalXp(this.toValue) - this.getTotalXp(event.value);
	}

	onChangeToLevel(event: MatSliderChange) {
		this.toValue = event.value;

		if (this.fromValue > event.value) {
			this.fromValue = event.value - 1;
			this.fromPic = buildings[event.value - 1].pic;
		}

		this.fromMax = event.value - 1;
		this.toPic = buildings[event.value].pic;
		this.totalCost = buildings[event.value].total - buildings[this.fromValue].total;

		this.totalTime = this.getTotalTime(event.value) - this.getTotalTime(this.fromValue);
		this.totalXp = this.getTotalXp(event.value) - this.getTotalXp(this.fromValue);
	}


}