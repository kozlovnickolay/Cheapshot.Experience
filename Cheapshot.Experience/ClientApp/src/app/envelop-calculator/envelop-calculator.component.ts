import { Component, OnInit } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatSliderChange } from '@angular/material';


@Component({
	templateUrl: './envelop-calculator.component.html',
	styleUrls: ['./envelop-calculator.component.css']
})
export class EnvelopCalculatorComponent implements OnInit {

	constructor(public font: CheapshotFont) { }

	ngOnInit() {
	}

	autoTicks = false;
	disabled = false;
	invert = false;
	max = 349;
	min = 1;
	showTicks = false;
	step = 1;
	thumbLabel = true;
	value = 1;
	vertical = false;
	color = 'primary';

	money = 750000;

	base = 750000;

	onAddClick = () => this.value++;
	onRemoveClick = () => this.value--;

	onChangeLevel(event: MatSliderChange) {
		this.value = event.value;
		this.money = this.base * Math.pow(1.05, event.value - 1)
	}

}
