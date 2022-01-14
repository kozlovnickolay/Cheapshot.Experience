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
	thumbLabel = false;
	value = 1;
	vertical = false;
	color = 'warn';

	editValue = false;


	money = 750000;
	rubles = 66555.55;
	dollar = 722.11;
	euro = 722.11;
	hryvnia = 20044;

	base = 750000;
	costBase = {
		rubles: 5990,
		dollar: 54.99,
		euro: 64.99,
		hryvnia: 1803.96
	}

	onAddClick = () => this.value++;
	onRemoveClick = () => this.value--;

	onEditClick = () => this.editValue = true;

	onChangeLevel(event: MatSliderChange) {
		if (this.editValue)
			this.editValue = false;

		this.value = event.value;
		this.money = this.base * Math.pow(1.05, event.value - 1)
		this.rubles = event.value < 200 ? this.getCostOf1B(this.money, this.costBase.rubles) : this.getCostOf1T(this.money, this.costBase.rubles);
		this.hryvnia = event.value < 200 ? this.getCostOf1B(this.money, this.costBase.hryvnia) : this.getCostOf1T(this.money, this.costBase.hryvnia);
		this.dollar = event.value < 200 ? this.getCostOf1B(this.money, this.costBase.dollar) : this.getCostOf1T(this.money, this.costBase.dollar);
		this.euro = event.value < 200 ? this.getCostOf1B(this.money, this.costBase.euro) : this.getCostOf1T(this.money, this.costBase.euro);

	}

	getCostOf1B(money: number, base: number) {
		return base / (120 * money / 1000000000);
	}

	getCostOf1T(money: number, base: number) {
		return base / (120 * money / 1000000000000);
	}

}
