import { Component, OnInit } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatSliderChange } from '@angular/material';

interface Currency {
	value: number;
	isoName: string;
}
@Component({
	templateUrl: './envelop-calculator.component.html',
	styleUrls: ['./envelop-calculator.component.css']
})
export class EnvelopCalculatorComponent implements OnInit {

	constructor(public font: CheapshotFont) { }

	ngOnInit() {
		this.costs.push({
			value: this.getCostOf1B(this.base, this.costBase.rub),
			isoName: 'RUB'
		}, {
			value: this.getCostOf1B(this.base, this.costBase.eur),
			isoName: 'EUR'
		}, {
			value: this.getCostOf1B(this.base, this.costBase.usd),
			isoName: 'USD'
		}, {
			value: this.getCostOf1B(this.base, this.costBase.sek),
			isoName: 'SEK'
		}, {
			value: this.getCostOf1B(this.base, this.costBase.uah),
			isoName: 'UAH'
		}, {
			value: this.getCostOf1B(this.base, this.costBase.gpb),
			isoName: 'GBP'
		})
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

	costs: Currency[] = [];

	base = 750000;

	costBase = {
		rub: 5990,
		usd: 79.99,
		eur: 64.99,
		uah: 1803.96,
		sek: 695,
		gpb: 54.99
	};

	onAddClick = () => this.value++;
	onRemoveClick = () => this.value--;

	onEditClick = () => this.editValue = true;

	onChangeLevel(event: MatSliderChange) {
		if (this.editValue)
			this.editValue = false;

		this.value = event.value;
		this.money = this.base * Math.pow(1.05, event.value - 1);

		this.costs = [];

		this.costs.push({
			value: event.value < 200 ? this.getCostOf1B(this.money, this.costBase.rub) : this.getCostOf1T(this.money, this.costBase.rub),
			isoName: 'RUB'
		}, {
			value: event.value < 200 ? this.getCostOf1B(this.money, this.costBase.eur) : this.getCostOf1T(this.money, this.costBase.eur),
			isoName: 'EUR'
		}, {
			value: event.value < 200 ? this.getCostOf1B(this.money, this.costBase.usd) : this.getCostOf1T(this.money, this.costBase.usd),
			isoName: 'USD'
		}, {
			value:event.value < 200 ? this.getCostOf1B(this.money, this.costBase.sek) : this.getCostOf1T(this.money, this.costBase.sek),
			isoName: 'SEK'
		}, {
			value: event.value < 200 ? this.getCostOf1B(this.money, this.costBase.uah) : this.getCostOf1T(this.money, this.costBase.uah),
			isoName: 'UAH'
		}, {
			value: event.value < 200 ? this.getCostOf1B(this.money, this.costBase.gpb) : this.getCostOf1T(this.money, this.costBase.gpb),
			isoName: 'GBP'
		});

	}

	getCostOf1B(money: number, base: number) {
		return base / (120 * money / 1000000000);
	}

	getCostOf1T(money: number, base: number) {
		return base / (120 * money / 1000000000000);
	}

}
